import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight, Newspaper, Calendar } from 'lucide-react';
import blogPlaceholder1 from '@/assets/blog-placeholder-1.jpg';
import blogPlaceholder2 from '@/assets/blog-placeholder-2.jpg';
import blogPlaceholder3 from '@/assets/blog-placeholder-3.jpg';

const placeholders = [blogPlaceholder1, blogPlaceholder2, blogPlaceholder3];

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
}

const BlogSection = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data as Post[]);
      });
  }, []);

  return (
    <section id="blog-section" className="relative overflow-hidden border-t border-border py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Newspaper className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {t('blog.section.title')}
            </h2>
          </div>
          <Link
            to="/blog"
            className="group flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
          >
            {t('blog.section.viewAll')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Link key={p.id} to={`/blog/${p.slug}`}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.cover_image_url || placeholders[i % placeholders.length]}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 backdrop-blur-sm">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(p.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-3 font-display text-lg font-semibold leading-tight text-foreground transition group-hover:text-primary">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {p.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all group-hover:gap-2.5">
                      {t('blog.section.readMore')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
            <Newspaper className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">{t('blog.section.empty')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
