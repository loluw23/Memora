
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Share2 } from 'lucide-react';

const StatsHeader = () => {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Study Statistics</h1>
          <p className="text-muted-foreground">Track your progress and learning insights</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="rounded-full">
            <Calendar className="h-4 w-4 mr-2" /> Last 7 Days
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
