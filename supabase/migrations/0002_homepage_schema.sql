-- ==============================================================================
-- MASTER ADMIN DASHBOARD SCHEMA
-- Phase 6: Homepage Content
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.homepage_content (
    id INTEGER PRIMARY KEY CHECK (id = 1), -- Singleton table (only 1 row ever)
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

-- RLS Policies
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Public can view homepage content" ON public.homepage_content
    FOR SELECT USING (true);

-- Admins can manage
CREATE POLICY "Admins can manage homepage content" ON public.homepage_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true
        )
    );

-- Insert initial seed data if table is empty
INSERT INTO public.homepage_content (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Trigger to update 'updated_at'
CREATE TRIGGER update_homepage_content_updated_at
    BEFORE UPDATE ON public.homepage_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
