import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundSize: '350px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
              <span className="font-bold text-2xl" style={{color: '#00ffff'}}>S</span>
            </div>
            <span className="text-3xl font-bold" style={{color: '#00ffff'}}>StackX</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span style={{color: '#00ffff'}}>Welcome Back</span>
          </h1>
          <p className="text-muted-foreground">Sign in to continue your financial journey</p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}