
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ArrowRight, Mail, Github, CheckCircle } from 'lucide-react';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
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
          {/* Signup Form */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground mb-8">Join thousands of students improving their learning</p>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <SignupForm />
                
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
                  Already have an account?{" "}
                  <Link to="/login" className="text-memora-purple hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
          
          {/* Features and Image */}
          <div className="hidden md:block flex-1">
            <div className="rounded-lg overflow-hidden border border-border mb-8 aspect-video bg-gradient-to-br from-memora-purple/10 to-memora-purple/30 relative shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl text-muted-foreground">Learning Materials Preview</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Why students love Memora</h3>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-memora-purple h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Scientifically-proven learning methods</h4>
                  <p className="text-sm text-muted-foreground">Spaced repetition helps you remember information longer</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-memora-purple h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Track your progress</h4>
                  <p className="text-sm text-muted-foreground">See detailed analytics on your learning journey</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-memora-purple h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Variety of study tools</h4>
                  <p className="text-sm text-muted-foreground">Flashcards, quizzes, and worksheets all in one place</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
