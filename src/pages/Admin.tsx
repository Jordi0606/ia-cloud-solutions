import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Trash2, Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  priority: string | null;
  message: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postForm, setPostForm] = useState({ title: '', slug: '', content: '', excerpt: '' });
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [aiTopic, setAiTopic] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchContacts();
      fetchPosts();
    }
  }, [user, isAdmin]);

  const fetchContacts = async () => {
    const { data } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
    if (data) setContacts(data);
  };

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data as BlogPost[]);
  };

  const handleSavePost = async () => {
    if (!postForm.title || !postForm.slug || !postForm.content) {
      toast({ title: 'Completa título, slug y contenido', variant: 'destructive' });
      return;
    }

    if (editingPost) {
      const { error } = await supabase.from('blog_posts').update({
        title: postForm.title,
        slug: postForm.slug,
        content: postForm.content,
        excerpt: postForm.excerpt || null,
      }).eq('id', editingPost);
      if (error) toast({ title: error.message, variant: 'destructive' });
      else { toast({ title: 'Post actualizado' }); setEditingPost(null); }
    } else {
      const { error } = await supabase.from('blog_posts').insert({
        title: postForm.title,
        slug: postForm.slug,
        content: postForm.content,
        excerpt: postForm.excerpt || null,
        author_id: user!.id,
      });
      if (error) toast({ title: error.message, variant: 'destructive' });
      else toast({ title: 'Post creado' });
    }
    setPostForm({ title: '', slug: '', content: '', excerpt: '' });
    fetchPosts();
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase.from('blog_posts').update({ published: !published }).eq('id', id);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  const deleteContact = async (id: string) => {
    await supabase.from('contact_requests').delete().eq('id', id);
    fetchContacts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      toast({ title: 'Escribe un tema para generar', variant: 'destructive' });
      return;
    }
    setAiLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ topic: aiTopic }),
      });
      if (!response.ok) {
        const err = await response.json();
        toast({ title: err.error || 'Error al generar', variant: 'destructive' });
        return;
      }
      const data = await response.json();
      setPostForm({
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
      });
      setAiTopic('');
      toast({ title: '¡Borrador generado con IA!' });
    } catch (e) {
      toast({ title: 'Error de conexión', variant: 'destructive' });
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background text-foreground">Cargando...</div>;
  if (!isAdmin) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground gap-4">
      <p>No tienes permisos de administrador.</p>
      <Button onClick={handleLogout} variant="outline">Cerrar sesión</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-iaclowd.png" alt="IAcloWd" className="h-8" />
            <h1 className="font-display text-lg font-bold">Panel Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Ver web</Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="contacts">
          <TabsList className="mb-6">
            <TabsTrigger value="contacts">Contactos ({contacts.length})</TabsTrigger>
            <TabsTrigger value="blog">Blog ({posts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card className="border-border bg-card">
              <CardHeader><CardTitle>Solicitudes de Contacto</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Mensaje</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{c.name}</TableCell>
                          <TableCell>{c.email}</TableCell>
                          <TableCell>{c.phone || '-'}</TableCell>
                          <TableCell className="capitalize">{c.priority || '-'}</TableCell>
                          <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => deleteContact(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {contacts.length === 0 && (
                        <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">Sin solicitudes</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border bg-card">
                <CardHeader><CardTitle>{editingPost ? 'Editar Post' : 'Nuevo Post'}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {/* AI Generation */}
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                    <Label className="mb-2 flex items-center gap-2 text-primary">
                      <Sparkles className="h-4 w-4" /> Generar con IA
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="Ej: Beneficios de la IA para PYMEs"
                        className="bg-secondary"
                        onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                      />
                      <Button onClick={handleAiGenerate} disabled={aiLoading} size="sm" className="shrink-0">
                        {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} className="mt-1 bg-secondary" />
                  </div>
                  <div>
                    <Label>Slug (URL)</Label>
                    <Input value={postForm.slug} onChange={(e) => setPostForm({ ...postForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="mt-1 bg-secondary" />
                  </div>
                  <div>
                    <Label>Extracto</Label>
                    <Input value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} className="mt-1 bg-secondary" />
                  </div>
                  <div>
                    <Label>Contenido</Label>
                    <Textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} className="mt-1 bg-secondary" rows={8} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePost} className="flex-1">{editingPost ? 'Actualizar' : 'Crear'}</Button>
                    {editingPost && <Button variant="outline" onClick={() => { setEditingPost(null); setPostForm({ title: '', slug: '', content: '', excerpt: '' }); }}>Cancelar</Button>}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader><CardTitle>Posts</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {posts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div>
                          <p className="font-medium text-sm">{p.title}</p>
                          <p className="text-xs text-muted-foreground">/{p.slug} · {new Date(p.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => togglePublish(p.id, p.published)}>
                            {p.published ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => { setEditingPost(p.id); setPostForm({ title: p.title, slug: p.slug, content: p.content, excerpt: p.excerpt || '' }); }}>Editar</Button>
                          <Button variant="ghost" size="sm" onClick={() => deletePost(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </div>
                    ))}
                    {posts.length === 0 && <p className="text-center text-sm text-muted-foreground">Sin posts</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
