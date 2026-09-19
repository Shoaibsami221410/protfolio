-- ==============================================================================
-- MASTER ADMIN DASHBOARD SCHEMA
-- Phase 7: RLS Patch & Ensure Homepage Table
-- ==============================================================================

-- 1. FIX INFINITE RECURSION ON admin_users
DROP POLICY IF EXISTS "Super Admins can manage admin users" ON public.admin_users;

-- Create a Security Definer function to check admin status without triggering RLS loops
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  );
$$;

-- Now safely apply the policy using the function
CREATE POLICY "Admins can view and manage admin_users" ON public.admin_users
    FOR ALL USING ( public.is_admin() );


-- 2. HOMEPAGE CONTENT (In case it wasn't run)
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id INTEGER PRIMARY KEY CHECK (id = 1), 
    hero_eyebrow TEXT NOT NULL DEFAULT 'Hello, I''m',
    hero_name TEXT NOT NULL DEFAULT 'Shoaib Sami',
    hero_primary_role TEXT NOT NULL DEFAULT 'Software Engineer',
    hero_secondary_role TEXT NOT NULL DEFAULT 'Machine Learning Enthusiast',
    hero_description TEXT NOT NULL DEFAULT 'Building intelligent things that solve real problems.',
    hero_cta_primary_text TEXT NOT NULL DEFAULT 'View Projects',
    hero_cta_primary_url TEXT NOT NULL DEFAULT '#projects',
    hero_cta_secondary_text TEXT NOT NULL DEFAULT 'Contact Me',
    hero_cta_secondary_url TEXT NOT NULL DEFAULT '#contact',
    hero_profile_image_id TEXT,
    hero_visibility BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies for homepage
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view homepage content" ON public.homepage_content;
CREATE POLICY "Public can view homepage content" ON public.homepage_content
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage homepage content" ON public.homepage_content;
CREATE POLICY "Admins can manage homepage content" ON public.homepage_content
    FOR ALL USING ( public.is_admin() );

-- Update project RLS to use the safe function
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
CREATE POLICY "Admins can manage projects" ON public.projects
    FOR ALL USING ( public.is_admin() );

-- Insert initial seed data if table is empty
INSERT INTO public.homepage_content (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- Phase 7: About, Skills, Experience, Education
-- ==============================================================================

-- ABOUT CONTENT (Singleton)
CREATE TABLE IF NOT EXISTS public.about_content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    short_introduction TEXT NOT NULL DEFAULT '',
    long_biography TEXT NOT NULL DEFAULT '',
    current_focus TEXT NOT NULL DEFAULT '',
    career_goal TEXT NOT NULL DEFAULT '',
    engineering_philosophy TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view about content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage about content" ON public.about_content FOR ALL USING ( public.is_admin() );
INSERT INTO public.about_content (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    website_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published skills" ON public.skills FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage skills" ON public.skills FOR ALL USING ( public.is_admin() );

-- EXPERIENCE
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    current_position BOOLEAN DEFAULT false,
    description TEXT,
    logo_id TEXT,
    technologies TEXT[],
    sort_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published experience" ON public.experience FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage experience" ON public.experience FOR ALL USING ( public.is_admin() );

-- EDUCATION
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    logo_id TEXT,
    location TEXT,
    sort_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published education" ON public.education FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage education" ON public.education FOR ALL USING ( public.is_admin() );

