
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ArrowRight, Mail, Github, Star as StarIcon } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/app');
    }
  }, [isAuthenticated, isLoading, navigate]);

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
      <div className="flex-1 container my-10 md:my-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Login Form */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-8">Sign in to continue your learning journey</p>

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
                    Sign up for free
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
          
          {/* Testimonial and Image */}
          <div className="hidden md:block flex-1">
            <div className="rounded-lg overflow-hidden border border-border mb-6 aspect-video bg-gradient-to-br from-memora-purple/10 to-memora-purple/30 relative shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl text-muted-foreground">Learning Dashboard Preview</div>
              </div>
            </div>
            
            <div className="bg-muted p-6 rounded-lg border border-border">
              <blockquote className="text-lg italic">
                "Memora has completely transformed how I study. The spaced repetition system helped me ace my finals!"
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="rounded-full bg-memora-purple/10 h-10 w-10"></div>
                <div className="ml-4">
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Medical Student</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
