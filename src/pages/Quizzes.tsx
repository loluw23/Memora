
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import QuizPreview, { Quiz } from '@/components/quizzes/QuizPreview';
import CreateButton from '@/components/common/CreateButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Trophy, Users, Crown, Plus, ClipboardCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data
const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'World Capitals Quiz',
    category: 'Geography',
    questionCount: 15,
    estimatedTime: '10 min',
    lastScore: 85,
    completedCount: 3,
    colorClass: 'bg-memora-teal'
  },
  {
    id: '2',
    title: 'Cell Biology Basics',
    category: 'Biology',
    questionCount: 20,
    estimatedTime: '15 min',
    lastScore: 92,
    completedCount: 2,
    colorClass: 'bg-memora-purple'
  },
  {
    id: '3',
    title: 'American History: Civil War',
    category: 'History',
    questionCount: 25,
    estimatedTime: '20 min',
    lastScore: 78,
    completedCount: 1,
    colorClass: 'bg-orange-400'
  },
  {
    id: '4',
    title: 'Spanish Vocabulary Test',
    category: 'Languages',
    questionCount: 30,
    estimatedTime: '25 min',
    lastScore: undefined,
    completedCount: 0,
    colorClass: 'bg-green-500'
  }
];

const recommendedQuizzes: Quiz[] = [
  {
    id: '5',
    title: 'Chemistry Elements',
    category: 'Chemistry',
    questionCount: 20,
    estimatedTime: '15 min',
    lastScore: undefined,
    completedCount: 0,
    colorClass: 'bg-blue-500'
  },
  {
    id: '6',
    title: 'Physics Fundamentals',
    category: 'Physics',
    questionCount: 15,
    estimatedTime: '12 min',
    lastScore: undefined,
    completedCount: 0,
    colorClass: 'bg-purple-500'
  }
];

const Quizzes = () => {
  const { toast } = useToast();
  
  const handleCreateClick = () => {
    toast({
      title: "Create new quiz",
      description: "Design your own quiz with custom questions",
    });
  };
  
  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Quiz Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-memora-purple/20 flex items-center justify-center">
                  <Trophy size={20} className="text-memora-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-memora-teal/20 flex items-center justify-center">
                  <Crown size={20} className="text-memora-teal" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Highest Score</p>
                  <p className="text-xl font-bold">95%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-orange-400/20 flex items-center justify-center">
                  <ClipboardCheck size={20} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-xl font-bold">82%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-between">
                <span>Geography</span>
                <span className="bg-secondary px-2 py-0.5 rounded text-xs">3</span>
              </Button>
              <Button variant="ghost" className="w-full justify-between">
                <span>Biology</span>
                <span className="bg-secondary px-2 py-0.5 rounded text-xs">2</span>
              </Button>
              <Button variant="ghost" className="w-full justify-between">
                <span>History</span>
                <span className="bg-secondary px-2 py-0.5 rounded text-xs">2</span>
              </Button>
              <Button variant="ghost" className="w-full justify-between">
                <span>Languages</span>
                <span className="bg-secondary px-2 py-0.5 rounded text-xs">1</span>
              </Button>
              <Button variant="outline" className="w-full mt-2">
                <Plus size={18} className="mr-2" />
                New Category
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Tabs defaultValue="my-quizzes" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <TabsList className="mb-6">
              <TabsTrigger value="my-quizzes" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
                My Quizzes
              </TabsTrigger>
              <TabsTrigger value="recommended" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
                Recommended
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
                <Users size={16} className="mr-1" />
                Popular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-quizzes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map(quiz => (
                  <QuizPreview key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedQuizzes.map(quiz => (
                  <QuizPreview key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Popular quizzes from the community will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <CreateButton onClick={handleCreateClick} />
    </MainLayout>
  );
};

export default Quizzes;
