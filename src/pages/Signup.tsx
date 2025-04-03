
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ArrowRight, Mail, Lock, User, Github, Google, CheckCircle } from 'lucide-react';

const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new user account
    window.location.href = '/app';
  };

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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="name" type="text" placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Min. 8 characters with at least 1 number and 1 special character
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the <Link to="#" className="text-memora-purple hover:underline">Terms of Service</Link> and <Link to="#" className="text-memora-purple hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-memora-purple hover:bg-memora-purple/90">
                    Create Account <ArrowRight size={16} className="ml-2" />
                  </Button>
                </form>
                
                <div className="mt-6 flex items-center">
                  <Separator className="flex-1" />
                  <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    <Google size={16} className="mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="flex-1">
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
