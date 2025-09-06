import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, CheckCircle, Lock, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created successfully! Please check your email to verify your account.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-800" style={{backgroundColor: '#0a0a0a'}}>
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
          <UserPlus className="w-8 h-8" style={{color: '#00ffff'}} />
        </div>
        <CardTitle className="text-2xl font-bold">
          <span style={{color: '#00ffff'}}>Join StackX</span>
        </CardTitle>
        <p className="text-muted-foreground">Create your account to start building wealth</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="border-red-500/20" style={{backgroundColor: '#ff000010'}}>
              <AlertCircle className="h-4 w-4" style={{color: '#ff0000'}} />
              <AlertDescription style={{color: '#ff0000'}}>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500/20" style={{backgroundColor: '#00ff0010'}}>
              <CheckCircle className="h-4 w-4" style={{color: '#00ff00'}} />
              <AlertDescription style={{color: '#00ff00'}}>{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900"
                required
              />
            </div>
          </div>

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
                placeholder="Enter your password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900"
                required
                minLength={6}
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
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-semibold hover:underline" style={{color: '#00ffff'}}>
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};