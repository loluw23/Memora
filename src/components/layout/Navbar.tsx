
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Settings, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UserAvatar from './UserAvatar';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 animate-fade-in">
            <div className="bg-memora-purple text-white rounded-lg p-1">
              <BookOpen size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">Memora</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Library</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                    <Link
                      to="/library"
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent"
                    >
                      <div className="font-medium">Browse Library</div>
                      <div className="text-sm text-muted-foreground">
                        View all your study materials
                      </div>
                    </Link>
                    <Link
                      to="/flashcards"
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent"
                    >
                      <div className="font-medium">Flashcards</div>
                      <div className="text-sm text-muted-foreground">
                        Create and review flashcards
                      </div>
                    </Link>
                    <Link
                      to="/quizzes"
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent"
                    >
                      <div className="font-medium">Quizzes</div>
                      <div className="text-sm text-muted-foreground">
                        Test your knowledge
                      </div>
                    </Link>
                    <Link
                      to="/worksheets"
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent"
                    >
                      <div className="font-medium">Worksheets</div>
                      <div className="text-sm text-muted-foreground">
                        Practice with worksheets
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/flashcards" className={navigationMenuTriggerStyle()}>
                  Flashcards
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/quizzes" className={navigationMenuTriggerStyle()}>
                  Quizzes
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/stats" className={navigationMenuTriggerStyle()}>
                  Stats
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 rounded-full bg-secondary" />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors animate-fade-in" 
              variant="ghost"
              size="icon"
              asChild
              style={{ animationDelay: '0.3s' }}
            >
              <Link to="/stats">
                <BarChart2 size={20} />
              </Link>
            </Button>
            
            <Button 
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors animate-fade-in" 
              variant="ghost"
              size="icon"
              asChild
              style={{ animationDelay: '0.4s' }}
            >
              <Link to="/settings">
                <Settings size={20} />
              </Link>
            </Button>
            
            <Link to="/profile">
              <UserAvatar className="animate-fade-in" style={{ animationDelay: '0.5s' }} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
