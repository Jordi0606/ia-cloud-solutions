import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;
    supabase.from('blog_posts').select('id, title, content, created_at').eq('slug', slug).eq('published', true).single()
      .then(({ data }) => { if (data) setPost(data as Post); });
  }, [slug]);

  if (!post) return (
    <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
      Cargando...
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Link to="/blog"><Button variant="ghost" size="sm" className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Volver al blog</Button></Link>
        <p className="mb-2 text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
        <h1 className="mb-8 font-display text-3xl font-bold md:text-4xl">{post.title}</h1>
        <div className="prose prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
