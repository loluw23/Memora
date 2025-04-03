
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ArrowRight, Mail, Lock, Github, Star as StarIcon } from 'lucide-react';

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate the user
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
          {/* Login Form */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-8">Sign in to continue your learning journey</p>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="#" className="text-xs text-memora-purple hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">Remember me for 30 days</Label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-memora-purple hover:bg-memora-purple/90">
                    Sign in <ArrowRight size={16} className="ml-2" />
                  </Button>
                </form>
                
                <div className="mt-6 flex items-center">
                  <Separator className="flex-1" />
                  <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    <Mail size={16} className="mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="flex-1">
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
