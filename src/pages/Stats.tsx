
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, Clock, Award, BrainCircuit, BarChart2, Flame, 
  ArrowUp, ArrowDown, TrendingUp, BookOpen, Medal
} from 'lucide-react';
import { BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data for charts
const studyTimeData = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 60 },
  { day: 'Thu', minutes: 25 },
  { day: 'Fri', minutes: 50 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 40 },
];

const cardReviewData = [
  { day: 'Mon', count: 20 },
  { day: 'Tue', count: 15 },
  { day: 'Wed', count: 35 },
  { day: 'Thu', count: 10 },
  { day: 'Fri', count: 25 },
  { day: 'Sat', count: 40 },
  { day: 'Sun', count: 15 },
];

const subjectData = [
  { subject: 'Biology', percentage: 30 },
  { subject: 'History', percentage: 25 },
  { subject: 'Geography', percentage: 15 },
  { subject: 'Languages', percentage: 20 },
  { subject: 'Physics', percentage: 10 },
];

const Stats = () => {
  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Study Statistics</h1>
        <p className="text-muted-foreground">Track your progress and learning insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-memora-purple/20 flex items-center justify-center">
                <Clock size={24} className="text-memora-purple" />
              </div>
              <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs">
                <ArrowUp size={14} />
                <span>12%</span>
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm mb-1">Total Study Time</h3>
            <div className="text-2xl font-bold">15h 24m</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-memora-teal/20 flex items-center justify-center">
                <BookOpen size={24} className="text-memora-teal" />
              </div>
              <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs">
                <ArrowUp size={14} />
                <span>8%</span>
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm mb-1">Cards Reviewed</h3>
            <div className="text-2xl font-bold">385</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-orange-400/20 flex items-center justify-center">
                <Medal size={24} className="text-orange-400" />
              </div>
              <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs">
                <TrendingUp size={14} />
                <span>Stable</span>
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm mb-1">Quiz Score Avg</h3>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Flame size={24} className="text-green-500" />
              </div>
              <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full text-xs">
                <ArrowDown size={14} />
                <span>2 days</span>
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm mb-1">Current Streak</h3>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground mt-1">Best: 14 days</p>
          </CardContent>
        </Card>
      </div>
      
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Weekly Study Time</CardTitle>
                <CardDescription>Hours spent studying per day</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <RBarChart
                  width={500}
                  height={250}
                  data={studyTimeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="minutes" fill="#8B5CF6" name="Minutes" />
                </RBarChart>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Cards Reviewed</CardTitle>
                <CardDescription>Number of flashcards reviewed</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <RBarChart
                  width={500}
                  height={250}
                  data={cardReviewData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0EA5E9" name="Cards" />
                </RBarChart>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Subject Distribution</CardTitle>
              <CardDescription>Time spent on each subject</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {subjectData.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <span className="text-sm text-muted-foreground">{subject.percentage}%</span>
                    </div>
                    <Progress 
                      value={subject.percentage} 
                      className="h-2" 
                      indicatorClassName={
                        index === 0 ? "bg-memora-purple" :
                        index === 1 ? "bg-memora-teal" :
                        index === 2 ? "bg-orange-400" :
                        index === 3 ? "bg-green-500" : "bg-blue-500"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Biology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cards mastered</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Quiz average</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" indicatorClassName="bg-memora-teal" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Study time</span>
                      <span className="text-sm font-medium">5h 30m</span>
                    </div>
                    <Progress value={70} className="h-2" indicatorClassName="bg-memora-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cards mastered</span>
                      <span className="text-sm font-medium">48%</span>
                    </div>
                    <Progress value={48} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Quiz average</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" indicatorClassName="bg-memora-teal" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Study time</span>
                      <span className="text-sm font-medium">4h 15m</span>
                    </div>
                    <Progress value={60} className="h-2" indicatorClassName="bg-memora-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Learning Progress</CardTitle>
              <CardDescription>Your knowledge retention over time</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Detailed learning progress charts will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Stats;
