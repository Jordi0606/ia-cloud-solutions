
CREATE TABLE public.blog_post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('es', 'en', 'ca')),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, language)
);

ALTER TABLE public.blog_post_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read translations" ON public.blog_post_translations
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage translations" ON public.blog_post_translations
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
