
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Worksheet {
  id: string;
  title: string;
  description?: string;
  questionCount?: number;
  estimatedTime?: string;
  completedCount?: number;
  lastScore?: number;
  colorClass?: string;
  subject?: string;
  type?: string;
  grade?: string;
  createdAt?: string;
}

interface WorksheetPreviewProps {
  worksheet: Worksheet;
}

const WorksheetPreview: React.FC<WorksheetPreviewProps> = ({ worksheet }) => {
  const {
    id,
    title,
    description,
    questionCount,
    estimatedTime,
    completedCount,
    lastScore,
    colorClass = 'bg-memora-purple',
    subject,
    type,
    grade
  } = worksheet;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className={`text-white ${colorClass} rounded-t-lg`}>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{title}</h3>
          {subject && type && (
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-white bg-opacity-30 rounded-full px-2 py-1">
                {subject}
              </span>
              <span className="text-xs bg-white bg-opacity-30 rounded-full px-2 py-1">
                {type}
              </span>
            </div>
          )}
        </div>
        {description && <p className="text-sm opacity-90">{description}</p>}
      </CardHeader>
      
      <CardContent className="py-4 flex-grow">
        <div className="flex items-center gap-4">
          {questionCount !== undefined && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <FileText size={16} />
              <span>{questionCount} Questions</span>
            </div>
          )}
          
          {estimatedTime && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>{estimatedTime}</span>
            </div>
          )}
          
          {grade && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Award size={16} />
              <span>Grade {grade}</span>
            </div>
          )}
        </div>
        
        {completedCount !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {completedCount > 0 
                  ? `Completed ${completedCount} ${completedCount === 1 ? 'time' : 'times'}`
                  : 'Not completed yet'
                }
              </span>
              {lastScore !== undefined && completedCount > 0 && (
                <span className="font-medium">
                  Last score: {lastScore}%
                </span>
              )}
            </div>
            
            {completedCount > 0 && (
              <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{width: `${lastScore}%`}}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            asChild
          >
            <Link to={`/worksheets/${id}/preview`}>Preview</Link>
          </Button>
          
          <Button 
            size="sm"
            className="flex-1 bg-memora-purple hover:bg-memora-purple/90"
            asChild
          >
            <Link to={`/worksheets/${id}`}>
              {completedCount && completedCount > 0 ? 'Retry' : 'Start'}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorksheetPreview;
