
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const LearningProgress = () => {
  return (
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
  );
};

export default LearningProgress;
