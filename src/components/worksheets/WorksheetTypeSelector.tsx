
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, FileText, Calculator, GraduationCap, List, Grid3X3 } from 'lucide-react';
import { WorksheetSubject } from './SubjectSelector';

export type WorksheetType = 
  // Math types
  | 'grid' 
  | 'problem_solving' 
  | 'fractions' 
  | 'algebra'
  // Language types
  | 'vocabulary'
  | 'grammar'
  | 'reading'
  | 'writing'
  // Science types
  | 'biology'
  | 'chemistry'
  | 'physics'
  // Generic types
  | 'questions'
  | 'fill_blank'
  | 'matching'
  | 'multiple_choice';

interface WorksheetTypeOption {
  id: WorksheetType;
  name: string;
  description: string;
  icon: React.ReactNode;
  subjects: WorksheetSubject[];
}

const worksheetTypes: WorksheetTypeOption[] = [
  {
    id: 'grid',
    name: 'Math Grid',
    description: 'Basic operations arranged in a grid',
    icon: <Grid3X3 className="h-6 w-6" />,
    subjects: ['math']
  },
  {
    id: 'problem_solving',
    name: 'Problem Solving',
    description: 'Word problems and applied math',
    icon: <Calculator className="h-6 w-6" />,
    subjects: ['math']
  },
  {
    id: 'fractions',
    name: 'Fractions & Decimals',
    description: 'Practice with fractions and decimals',
    icon: <FileText className="h-6 w-6" />,
    subjects: ['math']
  },
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Equations and algebraic expressions',
    icon: <GraduationCap className="h-6 w-6" />,
    subjects: ['math']
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    description: 'Word definitions and usage',
    icon: <BookOpen className="h-6 w-6" />,
    subjects: ['language', 'literature']
  },
  {
    id: 'grammar',
    name: 'Grammar',
    description: 'Grammar rules and applications',
    icon: <FileText className="h-6 w-6" />,
    subjects: ['language']
  },
  {
    id: 'reading',
    name: 'Reading Comprehension',
    description: 'Passages with questions',
    icon: <BookOpen className="h-6 w-6" />,
    subjects: ['language', 'literature']
  },
  {
    id: 'writing',
    name: 'Writing Prompts',
    description: 'Essay and paragraph prompts',
    icon: <FileText className="h-6 w-6" />,
    subjects: ['language', 'literature']
  },
  {
    id: 'questions',
    name: 'Short Answer',
    description: 'General questions with short answers',
    icon: <List className="h-6 w-6" />,
    subjects: ['math', 'language', 'science', 'history', 'geography', 'literature', 'music', 'art', 'computerscience', 'economics', 'physics', 'chemistry']
  },
  {
    id: 'multiple_choice',
    name: 'Multiple Choice',
    description: 'Questions with multiple options',
    icon: <List className="h-6 w-6" />,
    subjects: ['math', 'language', 'science', 'history', 'geography', 'literature', 'music', 'art', 'computerscience', 'economics', 'physics', 'chemistry']
  },
  {
    id: 'fill_blank',
    name: 'Fill in the Blank',
    description: 'Complete sentences with missing words',
    icon: <FileText className="h-6 w-6" />,
    subjects: ['language', 'science', 'history', 'geography', 'literature', 'music', 'art', 'computerscience', 'economics', 'physics', 'chemistry']
  },
  {
    id: 'matching',
    name: 'Matching',
    description: 'Match items in two columns',
    icon: <FileText className="h-6 w-6" />,
    subjects: ['language', 'science', 'history', 'geography', 'literature', 'music', 'art', 'computerscience', 'economics', 'physics', 'chemistry']
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
  // Filter worksheet types based on selected subject
  const filteredTypes = worksheetTypes.filter(
    type => type.subjects.includes(selectedSubject)
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === type.id ? 'ring-2 ring-memora-purple shadow-sm' : ''
            }`}
            onClick={() => onSelectType(type.id)}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="rounded-full bg-muted p-2">
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
