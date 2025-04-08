
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Mail, Github } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to app
  const from = location.state?.from || '/app';

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border py-4">
        <div className="container">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-memora-purple text-white rounded-lg p-1">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Memora</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container my-10 md:my-16 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <LoginForm />
              
              <div className="mt-6 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" disabled>
                  <Mail size={16} className="mr-2" />
                  Email
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  <Github size={16} className="mr-2" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-memora-purple hover:underline font-medium">
                  Create account
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
