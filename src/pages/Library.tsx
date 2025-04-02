
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LibraryCollection, { CollectionItem } from '@/components/library/LibraryCollection';
import CreateButton from '@/components/common/CreateButton';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, FileCheck, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data
const flashcardCollections: CollectionItem[] = [
  {
    id: '1',
    title: 'American History',
    category: 'History',
    itemCount: 120,
    lastStudied: '2 days ago',
    progress: 65,
    color: 'bg-memora-purple'
  },
  {
    id: '2',
    title: 'Cell Biology',
    category: 'Biology',
    itemCount: 85,
    lastStudied: 'Yesterday',
    progress: 78,
    color: 'bg-memora-teal'
  },
  {
    id: '3',
    title: 'Spanish Vocabulary',
    category: 'Languages',
    itemCount: 200,
    lastStudied: '4 days ago',
    progress: 42,
    color: 'bg-orange-400'
  },
  {
    id: '4',
    title: 'Organic Chemistry',
    category: 'Chemistry',
    itemCount: 150,
    lastStudied: '1 week ago',
    progress: 30,
    color: 'bg-green-500'
  }
];

const quizCollections: CollectionItem[] = [
  {
    id: '5',
    title: 'Geography Quizzes',
    category: 'Geography',
    itemCount: 12,
    lastStudied: '3 days ago',
    progress: 50,
    color: 'bg-memora-teal'
  },
  {
    id: '6',
    title: 'Math Problem Sets',
    category: 'Mathematics',
    itemCount: 25,
    lastStudied: '5 days ago',
    progress: 65,
    color: 'bg-purple-500'
  }
];

const worksheetCollections: CollectionItem[] = [
  {
    id: '7',
    title: 'Physics Problem Sets',
    category: 'Physics',
    itemCount: 18,
    lastStudied: '1 week ago',
    progress: 40,
    color: 'bg-blue-500'
  },
  {
    id: '8',
    title: 'Calculus Worksheets',
    category: 'Mathematics',
    itemCount: 15,
    lastStudied: '2 days ago',
    progress: 70,
    color: 'bg-indigo-500'
  }
];

const Library = () => {
  const { toast } = useToast();
  
  const handleCreateClick = () => {
    toast({
      title: "Create new collection",
      description: "Choose what type of collection to create",
    });
  };
  
  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Your Library</h1>
        <p className="text-muted-foreground">Manage and organize all your study materials</p>
      </div>
      
      <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            All Materials
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <BookOpen size={16} className="mr-1" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <FileCheck size={16} className="mr-1" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="worksheets" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <Calculator size={16} className="mr-1" />
            Worksheets
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-10">
          <LibraryCollection title="Flashcard Collections" items={flashcardCollections.slice(0, 3)} />
          <LibraryCollection title="Quiz Collections" items={quizCollections} />
          <LibraryCollection title="Worksheet Collections" items={worksheetCollections} />
        </TabsContent>
        
        <TabsContent value="flashcards">
          <LibraryCollection title="Flashcard Collections" items={flashcardCollections} />
        </TabsContent>
        
        <TabsContent value="quizzes">
          <LibraryCollection title="Quiz Collections" items={quizCollections} />
        </TabsContent>
        
        <TabsContent value="worksheets">
          <LibraryCollection title="Worksheet Collections" items={worksheetCollections} />
        </TabsContent>
      </Tabs>
      
      <CreateButton onClick={handleCreateClick} />
    </MainLayout>
  );
};

export default Library;
