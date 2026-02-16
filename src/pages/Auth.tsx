import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: error.message, variant: 'destructive' });
      } else {
        navigate('/admin');
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast({ title: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Revisa tu email para confirmar el registro.' });
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <img src="/logo-iaclowd.png" alt="IAcloWd" className="mx-auto mb-4 h-12" />
          <h1 className="font-display text-2xl font-bold text-foreground">
            {isLogin ? 'Iniciar Sesión' : 'Registro'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-secondary" required />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 bg-secondary" required minLength={6} />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? '...' : isLogin ? 'Entrar' : 'Registrarse'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => navigate('/')}>
          ← Volver a la web
        </Button>
      </div>
    </div>
  );
};

export default Auth;
