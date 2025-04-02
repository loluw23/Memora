
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Tag } from 'lucide-react';
import QuizPreview, { Quiz } from '@/components/quizzes/QuizPreview';
import CreateQuiz from '@/components/quizzes/CreateQuiz';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Sample data
const initialQuizzes: Quiz[] = [
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
    title: 'American Literature',
    category: 'Literature',
    questionCount: 12,
    estimatedTime: '8 min',
    lastScore: 75,
    completedCount: 1,
    colorClass: 'bg-orange-400'
  },
  {
    id: '4',
    title: 'Periodic Table Elements',
    category: 'Chemistry',
    questionCount: 25,
    estimatedTime: '20 min',
    lastScore: 68,
    completedCount: 1,
    colorClass: 'bg-green-500'
  }
];

const categories = [
  { name: 'All', count: 10 },
  { name: 'Geography', count: 3 },
  { name: 'Biology', count: 2 },
  { name: 'Literature', count: 2 },
  { name: 'Chemistry', count: 1 },
  { name: 'Mathematics', count: 1 },
  { name: 'History', count: 1 },
];

const Quizzes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = currentCategory === 'All' || quiz.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateQuiz = (quiz: any) => {
    const colorClasses = ['bg-memora-purple', 'bg-memora-teal', 'bg-orange-400', 'bg-green-500', 'bg-blue-500'];
    
    const newQuiz: Quiz = {
      id: (quizzes.length + 1).toString(),
      title: quiz.title,
      category: quiz.category,
      questionCount: quiz.questionCount,
      estimatedTime: quiz.estimatedTime,
      lastScore: 0,
      completedCount: 0,
      colorClass: colorClasses[Math.floor(Math.random() * colorClasses.length)]
    };
    
    setQuizzes([...quizzes, newQuiz]);
  };

  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
      </div>
      
      <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TabsList className="md:mr-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
              All Quizzes
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
              Completed
            </TabsTrigger>
            <TabsTrigger value="inprogress" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
              In Progress
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search quizzes..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-memora-purple"
              onClick={() => setIsCreatingQuiz(true)}
            >
              <Plus size={16} className="mr-2" />
              New Quiz
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-4">
              <div className="font-medium flex items-center mb-3">
                <Tag size={16} className="mr-2 text-memora-purple" />
                Categories
              </div>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.name}
                    className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-lg ${
                      currentCategory === category.name 
                        ? 'bg-memora-purple text-white' 
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setCurrentCategory(category.name)}
                  >
                    <span>{category.name}</span>
                    <span className="bg-secondary-foreground/10 text-xs rounded-full px-2 py-0.5">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-3">
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuizzes.length === 0 ? (
                  <div className="text-center p-8 col-span-2">
                    <p className="text-muted-foreground">No quizzes found. Try adjusting your search or category.</p>
                  </div>
                ) : (
                  filteredQuizzes.map(quiz => (
                    <QuizPreview key={quiz.id} quiz={quiz} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuizzes
                  .filter(quiz => quiz.completedCount > 0)
                  .map(quiz => (
                    <QuizPreview key={quiz.id} quiz={quiz} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inprogress" className="m-0">
              <div className="text-center p-8">
                <p className="text-muted-foreground">You don't have any quizzes in progress.</p>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
      
      <Dialog open={isCreatingQuiz} onOpenChange={setIsCreatingQuiz}>
        <DialogContent className="sm:max-w-3xl">
          <CreateQuiz 
            onClose={() => setIsCreatingQuiz(false)}
            onSave={handleCreateQuiz}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Quizzes;
