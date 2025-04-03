
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import WorksheetPreview, { Worksheet } from '@/components/worksheets/WorksheetPreview';
import CreateWorksheet from '@/components/worksheets/CreateWorksheet';

// Sample worksheets data
const worksheetsData: Worksheet[] = [
  {
    id: '1',
    title: 'World History Timeline',
    description: 'Complete the timeline of major historical events',
    questionCount: 12,
    estimatedTime: '25 min',
    completedCount: 2,
    lastScore: 80,
    colorClass: 'bg-memora-purple'
  },
  {
    id: '2',
    title: 'Algebra Practice Problems',
    description: 'Solve equations and graph functions',
    questionCount: 15,
    estimatedTime: '30 min',
    completedCount: 1,
    lastScore: 75,
    colorClass: 'bg-memora-teal'
  },
  {
    id: '3',
    title: 'Grammar and Punctuation',
    description: 'Identify and correct grammatical errors',
    questionCount: 20,
    estimatedTime: '20 min',
    completedCount: 0,
    colorClass: 'bg-orange-400'
  },
  {
    id: '4',
    title: 'Cell Biology Diagrams',
    description: 'Label cell structures and describe their functions',
    questionCount: 10,
    estimatedTime: '15 min',
    completedCount: 3,
    lastScore: 90,
    colorClass: 'bg-blue-500'
  }
];

const Worksheets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter worksheets based on search query and active tab
  const filteredWorksheets = worksheetsData.filter(worksheet => {
    const matchesSearch = worksheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (worksheet.description && worksheet.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && worksheet.completedCount > 0;
    if (activeTab === 'uncompleted') return matchesSearch && worksheet.completedCount === 0;
    
    return matchesSearch;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Worksheets</h1>
            <p className="text-muted-foreground">Create and complete worksheets to practice your skills</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-memora-purple hover:bg-memora-purple/90">
                <Plus size={16} className="mr-1" /> Create Worksheet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <CreateWorksheet />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search worksheets..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-auto" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="uncompleted">Uncompleted</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredWorksheets.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredWorksheets.map(worksheet => (
              <WorksheetPreview key={worksheet.id} worksheet={worksheet} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-md">
            <p className="text-muted-foreground mb-2">No worksheets found</p>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Worksheets;
