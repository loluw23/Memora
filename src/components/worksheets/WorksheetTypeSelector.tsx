
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Puzzle, 
  MessageSquare, 
  BookOpen,
  SquarePen,
  SquareSigma,
  SquareStack,
  SquareDashedBottomCode
} from 'lucide-react';
import { WorksheetSubject } from './SubjectSelector';

export type WorksheetType = 
  | 'full' 
  | 'puzzles' 
  | 'word_problems' 
  | 'conceptual';

interface WorksheetTypeOption {
  id: WorksheetType;
  name: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  applicableSubjects: WorksheetSubject[];
}

// Define worksheet types
const worksheetTypes: WorksheetTypeOption[] = [
  {
    id: 'full',
    name: 'Full Worksheet',
    description: 'Complete set of questions covering the selected topic',
    icon: <FileText className="h-6 w-6" />,
    colorClass: 'bg-blue-100 text-blue-600',
    applicableSubjects: ['math', 'language', 'science', 'history', 'geography', 'music', 'art', 'literature']
  },
  {
    id: 'puzzles',
    name: 'Puzzles',
    description: 'Interactive puzzles to engage critical thinking',
    icon: <Puzzle className="h-6 w-6" />,
    colorClass: 'bg-green-100 text-green-600',
    applicableSubjects: ['math', 'language', 'science', 'geography']
  },
  {
    id: 'word_problems',
    name: 'Word Problems',
    description: 'Real-world scenarios requiring solution strategies',
    icon: <MessageSquare className="h-6 w-6" />,
    colorClass: 'bg-purple-100 text-purple-600',
    applicableSubjects: ['math', 'science', 'history']
  },
  {
    id: 'conceptual',
    name: 'Conceptual Understanding',
    description: 'Focus on deeper understanding of core concepts',
    icon: <BookOpen className="h-6 w-6" />,
    colorClass: 'bg-amber-100 text-amber-600',
    applicableSubjects: ['math', 'language', 'science', 'history', 'geography', 'music', 'art', 'literature']
  }
];

interface WorksheetTypeSelectorProps {
  selectedSubject: WorksheetSubject;
  selectedType: WorksheetType | null;
  onSelectType: (type: WorksheetType) => void;
}

const WorksheetTypeSelector: React.FC<WorksheetTypeSelectorProps> = ({ 
  selectedSubject, 
  selectedType, 
  onSelectType 
}) => {
  // Filter worksheet types applicable to the selected subject
  const compatibleTypes = worksheetTypes.filter(type => 
    type.applicableSubjects.includes(selectedSubject)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Worksheet Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {compatibleTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === type.id ? 'ring-2 ring-memora-purple' : ''
            }`}
            onClick={() => onSelectType(type.id)}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${type.colorClass}`}>
                {type.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{type.name}</h4>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorksheetTypeSelector;
