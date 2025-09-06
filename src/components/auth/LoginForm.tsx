import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting to sign in with email:', email);
      const { data, error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        setError(error.message);
      } else if (data?.session) {
        console.log('Sign in successful, navigating to dashboard');
        // Navigate to dashboard or home page after successful login
        navigate('/dashboard'); // or wherever you want to redirect
      } else {
        console.log('Sign in completed but no session returned');
        setError('Sign in completed but no session was created');
      }
    } catch (err) {
      console.error('Sign in exception:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-800" style={{backgroundColor: '#0a0a0a'}}>
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
          <LogIn className="w-8 h-8" style={{color: '#00ffff'}} />
        </div>
        <CardTitle className="text-2xl font-bold">
          <span style={{color: '#00ffff'}}>Welcome Back</span>
        </CardTitle>
        <p className="text-muted-foreground">Sign in to your StackX account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="border-red-500/20" style={{backgroundColor: '#ff000010'}}>
              <AlertCircle className="h-4 w-4" style={{color: '#ff0000'}} />
              <AlertDescription style={{color: '#ff0000'}}>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full font-bold py-6"
            disabled={isLoading}
            style={{backgroundColor: '#00ffff', color: '#000'}}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="font-semibold hover:underline" style={{color: '#00ffff'}}>
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};