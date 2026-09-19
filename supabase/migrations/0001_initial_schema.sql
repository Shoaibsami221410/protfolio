-- ==============================================================================
-- MASTER ADMIN DASHBOARD SCHEMA
-- Phase 2: Initial Architecture
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users (Custom Authorization Table)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'editor')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id),
    UNIQUE(email)
);

-- RLS for Admin Users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
-- Only Super Admins can read/write this table
CREATE POLICY "Super Admins can manage admin users" ON public.admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au 
            WHERE au.user_id = auth.uid() AND au.role = 'super_admin' AND au.is_active = true
        )
    );

-- 2. Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    year TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN NOT NULL DEFAULT false,
    featured_order INTEGER DEFAULT 0,
    cover_image_id TEXT, -- Will map to Storage
    github_url TEXT,
    live_url TEXT,
    iframe_url TEXT,
    problem TEXT,
    solution TEXT,
    features TEXT[],
    architecture TEXT,
    challenges TEXT,
    results TEXT,
    future_improvements TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Index for fast lookup on public routes
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_featured ON public.projects(featured);

-- RLS for Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
-- Public can only read published projects
CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT USING (status = 'published');
-- Admins can do everything
CREATE POLICY "Admins can manage projects" ON public.projects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true
        )
    );

-- Trigger to update 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
