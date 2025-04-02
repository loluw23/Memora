
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollArea className="h-screen pt-16">
        <main className="container py-8">
          {children}
        </main>
      </ScrollArea>
    </div>
  );
};

export default MainLayout;
