
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Brain, FileCheck, Star, Medal, Clock } from 'lucide-react';

const LandingPage = () => {
  // Refs for scroll sections
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header/Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-memora-purple text-white rounded-lg p-1">
                <BookOpen size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">Memora</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection(featuresRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection(howItWorksRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection(testimonialsRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection(pricingRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <Link to="/app">
              <Button className="rounded-full gap-1">
                Go to App <ArrowRight size={16} />
              </Button>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Link to="/app">
              <Button size="sm" className="rounded-full">
                App <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-32">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight max-w-3xl mb-6 animate-fade-in">
              Master Any Subject with <span className="text-memora-purple">Spaced Repetition</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Memora combines flashcards, quizzes, and AI-powered learning tools to help you learn faster and remember longer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/app">
                <Button size="lg" className="rounded-full px-8 bg-memora-purple hover:bg-memora-purple/90">
                  Get Started <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className="rounded-full px-8 py-2 border border-border hover:bg-secondary transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="aspect-video bg-gradient-to-r from-memora-purple/5 to-memora-purple/10 rounded-xl border border-border overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl text-muted-foreground">Dashboard Preview</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-memora-purple/10 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Learning Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to study efficiently and effectively.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="text-memora-purple" />}
              title="Spaced Repetition"
              description="Study cards at optimal intervals to maximize long-term retention with scientifically proven methods."
            />
            <FeatureCard 
              icon={<FileCheck className="text-memora-teal" />}
              title="Interactive Quizzes"
              description="Test your knowledge with adaptive quizzes that focus on your weak points."
            />
            <FeatureCard 
              icon={<Clock className="text-orange-400" />}
              title="Time Optimization"
              description="Our algorithm ensures you spend time on what you need to learn, not what you already know."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Memora Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A simple, proven process to help you learn anything.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="01"
              title="Create Your Materials"
              description="Add flashcards, import existing content, or use our AI-assisted content creation tools."
            />
            <StepCard 
              number="02"
              title="Study Smart"
              description="Review content based on our spaced repetition algorithm and test yourself with quizzes."
            />
            <StepCard 
              number="03"
              title="Track Progress"
              description="Visualize your learning journey with detailed analytics and insights."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Join thousands of successful students who've transformed their study habits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Memora helped me pass my medical board exams. The spaced repetition system is truly life-changing!"
              author="Dr. Sarah Johnson"
              role="Medical Resident"
              rating={5}
            />
            <TestimonialCard 
              quote="I've tried many study apps, but Memora is by far the most effective. My language learning has accelerated dramatically."
              author="Michael Chen"
              role="Language Enthusiast"
              rating={5}
            />
            <TestimonialCard 
              quote="As a teacher, I recommend Memora to all my students. It's transformed how they approach studying."
              author="Lisa Rodriguez"
              role="High School Teacher"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your learning needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Basic"
              price="Free"
              description="Perfect for casual learners"
              features={[
                "Up to 100 flashcards",
                "Basic quizzes",
                "Core learning analytics"
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard 
              title="Pro"
              price="$9.99/mo"
              description="For serious students"
              features={[
                "Unlimited flashcards",
                "Advanced quizzes & worksheets",
                "Detailed analytics",
                "AI-assisted content creation"
              ]}
              buttonText="Try Pro"
              buttonVariant="default"
              highlighted={true}
            />
            <PricingCard 
              title="Teams"
              price="$19.99/mo"
              description="Ideal for study groups"
              features={[
                "Everything in Pro",
                "Collaborative decks",
                "Group analytics",
                "Priority support"
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-memora-purple/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of students who are learning faster and remembering more with Memora.
            </p>
            <Link to="/app">
              <Button size="lg" className="rounded-full px-8 bg-memora-purple hover:bg-memora-purple/90">
                Start Learning Now <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-memora-purple text-white rounded-lg p-1">
                <BookOpen size={20} />
              </div>
              <span className="font-bold text-lg">Memora</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">© 2023 Memora. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="border-border/50 hover:border-memora-purple/30 transition-colors">
      <CardContent className="p-6 text-center">
        <div className="bg-background rounded-full p-3 inline-flex items-center justify-center mb-4">
          {React.cloneElement(icon as React.ReactElement, { size: 28 })}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-memora-purple/10 flex items-center justify-center mb-4 text-memora-purple font-bold text-xl">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, rating }: { quote: string, author: string, role: string, rating: number }) => {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="mb-6 text-sm italic">"{quote}"</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonVariant,
  highlighted = false
}: { 
  title: string, 
  price: string, 
  description: string, 
  features: string[], 
  buttonText: string, 
  buttonVariant: "default" | "outline", 
  highlighted?: boolean 
}) => {
  return (
    <Card className={`${highlighted ? 'border-memora-purple shadow-lg' : 'border-border'} relative`}>
      {highlighted && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-memora-purple text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardContent className={`p-6 ${highlighted ? 'pt-8' : ''}`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Medal size={16} className="text-memora-purple mr-2 mt-1 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full rounded-full ${highlighted ? 'bg-memora-purple hover:bg-memora-purple/90' : ''}`} 
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
