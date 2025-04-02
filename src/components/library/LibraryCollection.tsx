
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book, FileText, BarChart3 } from 'lucide-react';

export interface CollectionItem {
  id: string;
  title: string;
  category: string;
  itemCount: number;
  lastStudied: string;
  progress: number;
  color: string;
}

interface LibraryCollectionProps {
  title: string;
  items: CollectionItem[];
}

const LibraryCollection = ({ title, items }: LibraryCollectionProps) => {
  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="text-sm text-memora-purple hover:underline">View all</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card 
            key={item.id}
            className="hover-card hover:border-memora-purple/50 cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${item.color} text-white`}>
                  <Book size={24} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{item.category}</p>
                  
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      <span>{item.itemCount} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 size={14} />
                      <span>{item.progress}% complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LibraryCollection;
