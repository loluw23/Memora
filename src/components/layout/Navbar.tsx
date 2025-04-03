
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, BarChart2, Settings, Search, User, Home, ArrowRight, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UserAvatar from './UserAvatar';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const { toast } = useToast();
  const isLandingPage = location.pathname === "/";
  
  // Function to refresh the page when clicking the logo on non-landing pages
  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isLandingPage) {
      e.preventDefault();
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      await refreshUser();
      toast({
        title: 'Logged out',
        description: 'You have successfully logged out',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'An error occurred while logging out',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to={isLandingPage ? "/" : "#"} 
            onClick={handleLogoClick}
            className="flex items-center gap-2 animate-fade-in"
          >
            <div className="bg-memora-purple text-white rounded-lg p-1">
              <BookOpen size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">Memora</span>
          </Link>
          
          {isLandingPage ? (
            <NavigationMenu className="hidden md:flex animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    <Home size={16} className="mr-1" />
                    Home
                  </Link>
                </NavigationMenuItem>
                
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
                  <Link to="/worksheets" className={navigationMenuTriggerStyle()}>
                    Worksheets
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/stats" className={navigationMenuTriggerStyle()}>
                    Stats
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : null}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 rounded-full bg-secondary" />
          </div>
          
          <div className="flex items-center gap-2">
            {isLandingPage ? (
              isAuthenticated ? (
                <>
                  <Button 
                    className="rounded-full bg-memora-purple hover:bg-memora-purple/90 animate-fade-in" 
                    size="sm"
                    asChild
                    style={{ animationDelay: '0.3s' }}
                  >
                    <Link to="/app">
                      Dashboard <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                        <UserAvatar className="animate-fade-in" style={{ animationDelay: '0.35s' }} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {user?.profile?.username || 'Account'}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                        <LogOut size={14} className="mr-2" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button 
                    className="rounded-full bg-memora-purple hover:bg-memora-purple/90 animate-fade-in" 
                    size="sm"
                    asChild
                    style={{ animationDelay: '0.3s' }}
                  >
                    <Link to="/app">
                      App <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                  
                  <Button 
                    className="rounded-full animate-fade-in" 
                    size="sm"
                    variant="outline"
                    asChild
                    style={{ animationDelay: '0.35s' }}
                  >
                    <Link to="/login">
                      Login
                    </Link>
                  </Button>
                  
                  <Button 
                    className="rounded-full animate-fade-in" 
                    size="sm"
                    variant="secondary"
                    asChild
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Link to="/signup">
                      Sign Up
                    </Link>
                  </Button>
                </>
              )
            ) : (
              <>
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
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                      <UserAvatar className="animate-fade-in" style={{ animationDelay: '0.5s' }} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.profile?.username || 'Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut size={14} className="mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
