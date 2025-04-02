
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsHeader from '@/components/stats/StatsHeader';
import StatsCards from '@/components/stats/StatsCards';
import StatsOverview from '@/components/stats/StatsOverview';
import SubjectProgress from '@/components/stats/SubjectProgress';
import LearningProgress from '@/components/stats/LearningProgress';

const Stats = () => {
  return (
    <MainLayout>
      <StatsHeader />
      <StatsCards />
      
      <Tabs defaultValue="overview" className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            By Subject
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            Learning Progress
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <StatsOverview />
        </TabsContent>
        
        <TabsContent value="subjects">
          <SubjectProgress />
        </TabsContent>
        
        <TabsContent value="progress">
          <LearningProgress />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Stats;
