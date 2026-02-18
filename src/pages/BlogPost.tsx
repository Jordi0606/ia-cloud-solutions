import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import blogPlaceholder1 from '@/assets/blog-placeholder-1.jpg';

interface Post {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;
    supabase.from('blog_posts').select('id, title, content, cover_image_url, created_at').eq('slug', slug).eq('published', true).single()
      .then(({ data }) => { if (data) setPost(data as Post); });
  }, [slug]);

  if (!post) return (
    <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
      Cargando...
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={post.cover_image_url || blogPlaceholder1}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto max-w-3xl px-4 pb-6">
            <Link to="/blog"><Button variant="ghost" size="sm" className="mb-4 text-foreground/80 hover:text-foreground"><ArrowLeft className="mr-2 h-4 w-4" />Volver al blog</Button></Link>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <h1 className="font-display text-2xl font-bold md:text-4xl leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <div className="prose prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
