
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface Worksheet {
  id: string;
  title: string;
  description?: string;
  questionCount: number;
  estimatedTime: string;
  completedCount: number;
  lastScore?: number;
  colorClass: string;
}

interface WorksheetPreviewProps {
  worksheet: Worksheet;
}

const WorksheetPreview = ({ worksheet }: WorksheetPreviewProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          <div className={`${worksheet.colorClass} w-2`} />
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="font-semibold">{worksheet.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText size={14} />
                  <span>{worksheet.questionCount} questions • {worksheet.estimatedTime}</span>
                </div>
                {worksheet.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1">{worksheet.description}</p>
                )}
              </div>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <Link to={`/worksheets/${worksheet.id}`}>
                  <ChevronRight size={18} />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Completed {worksheet.completedCount} time{worksheet.completedCount !== 1 ? 's' : ''}
                </span>
                {worksheet.lastScore !== undefined && (
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                    Last: {worksheet.lastScore}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorksheetPreview;
