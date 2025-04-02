
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Settings, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UserAvatar from './UserAvatar';

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
          
          <div className="hidden md:flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors">
              Library
            </Link>
            <Link to="/flashcards" className="text-muted-foreground hover:text-foreground transition-colors">
              Flashcards
            </Link>
            <Link to="/quizzes" className="text-muted-foreground hover:text-foreground transition-colors">
              Quizzes
            </Link>
            <Link to="/stats" className="text-muted-foreground hover:text-foreground transition-colors">
              Stats
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 rounded-full bg-secondary" />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <BarChart2 size={20} />
            </button>
            <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Settings size={20} />
            </button>
            <UserAvatar className="animate-fade-in" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
