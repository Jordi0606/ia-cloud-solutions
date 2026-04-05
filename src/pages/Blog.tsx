import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { useBlogTranslations } from '@/hooks/useBlogTranslation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
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

const Blog = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase.from('blog_posts').select('id, title, slug, excerpt, cover_image_url, created_at').eq('published', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setPosts(data as Post[]); });
  }, []);

  const translations = useBlogTranslations(posts.map(p => p.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative border-b border-border bg-gradient-to-b from-primary/8 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{t('blog.back') || 'Volver'}</Button></Link>
            <h1 className="font-display text-3xl font-bold">{t('blog.pageTitle') || 'Blog & Noticias'}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => {
            const tr = translations[p.id];
            const title = tr?.title || p.title;
            const excerpt = tr?.excerpt ?? p.excerpt;

            return (
              <Link key={p.id} to={`/blog/${p.slug}`}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.cover_image_url || placeholders[i % placeholders.length]}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 backdrop-blur-sm">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="mb-3 font-display text-lg font-semibold leading-tight transition group-hover:text-primary">{title}</h2>
                    {excerpt && <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{excerpt}</p>}
                  </div>
                </article>
              </Link>
            );
          })}
          {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">{t('blog.empty') || 'Pronto publicaremos novedades.'}</p>}
        </div>
      </div>
    </div>
  );
};

export default Blog;
