import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight, Newspaper } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
}

const BlogSection = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data as Post[]);
      });
  }, []);

  return (
    <section id="blog-section" className="border-t border-border bg-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="h-7 w-7 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {t('blog.section.title')}
            </h2>
          </div>
          <Link
            to="/blog"
            className="group flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80"
          >
            {t('blog.section.viewAll')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`}>
                <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <p className="mb-2 text-xs text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="mb-3 font-display text-lg font-semibold text-foreground transition group-hover:text-primary">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="flex-1 text-sm text-muted-foreground line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {t('blog.section.readMore')}
                    <ArrowRight className="h-3 w-3" />
                  </span>
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
