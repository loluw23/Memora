
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

const StatsOverview = () => {
  return (
    <>
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
    </>
  );
};

export default StatsOverview;
