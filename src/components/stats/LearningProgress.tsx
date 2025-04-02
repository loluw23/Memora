
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', retention: 65, items: 12 },
  { day: 'Tue', retention: 70, items: 18 },
  { day: 'Wed', retention: 68, items: 14 },
  { day: 'Thu', retention: 75, items: 20 },
  { day: 'Fri', retention: 82, items: 25 },
  { day: 'Sat', retention: 85, items: 30 },
  { day: 'Sun', retention: 80, items: 22 },
];

const LearningProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Learning Progress</CardTitle>
        <CardDescription>Your knowledge retention over time</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="retention"
                name="Retention %"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="items" 
                name="Items Studied"
                stroke="#82ca9d" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
