import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { useBlogTranslations } from '@/hooks/useBlogTranslation';
import { ArrowRight, ArrowLeft, Newspaper, Calendar } from 'lucide-react';
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setPosts(data as Post[]);
      });
  }, []);

  const translations = useBlogTranslations(posts.map(p => p.id));

  const total = posts.length;
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section id="blog-section" className="relative overflow-hidden border-t border-border py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
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

        {total > 0 ? (
          <div className="relative mx-auto max-w-3xl">
            {total > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Anterior"
                className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-card/90 text-primary backdrop-blur transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {posts.map((p, i) => {
                  const tr = translations[p.id];
                  const title = tr?.title || p.title;
                  const excerpt = tr?.excerpt ?? p.excerpt;

                  return (
                    <div key={p.id} className="w-full shrink-0 px-1">
                      <Link to={`/blog/${p.slug}`}>
                        <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 sm:flex-row">
                          <div className="relative h-48 overflow-hidden sm:h-auto sm:w-1/2">
                            <img
                              src={p.cover_image_url || placeholders[i % placeholders.length]}
                              alt={title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent sm:bg-gradient-to-r" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 backdrop-blur-sm">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(p.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col justify-center p-5 sm:w-1/2 sm:p-6">
                            <h3 className="mb-3 font-display text-lg font-semibold leading-tight text-foreground transition group-hover:text-primary md:text-xl">
                              {title}
                            </h3>
                            {excerpt && (
                              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                {excerpt}
                              </p>
                            )}
                            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all group-hover:gap-2.5">
                              {t('blog.section.readMore')}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </article>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Siguiente"
                  className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-card/90 text-primary backdrop-blur transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-5 flex justify-center gap-2">
                  {posts.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Ir a noticia ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
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
