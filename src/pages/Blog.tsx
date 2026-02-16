import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase.from('blog_posts').select('id, title, slug, excerpt, created_at').eq('published', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setPosts(data as Post[]); });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Volver</Button></Link>
          <h1 className="font-display text-3xl font-bold">Blog & Noticias</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`}>
              <Card className="group border-border bg-card transition hover:border-primary/40 hover:shadow-lg">
                <CardContent className="p-6">
                  <p className="mb-2 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</p>
                  <h2 className="mb-2 font-display text-lg font-semibold group-hover:text-primary transition">{p.title}</h2>
                  {p.excerpt && <p className="text-sm text-muted-foreground">{p.excerpt}</p>}
                </CardContent>
              </Card>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center">Pronto publicaremos novedades.</p>}
        </div>
      </div>
    </div>
  );
};

export default Blog;
