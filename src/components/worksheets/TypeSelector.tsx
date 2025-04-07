
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  BookOpen, 
  Languages, 
  Atom, 
  GraduationCap, 
  Globe, 
  Music, 
  PenTool
} from 'lucide-react';

export type WorksheetType = 
  | 'math' 
  | 'language' 
  | 'science' 
  | 'history' 
  | 'geography' 
  | 'music' 
  | 'art' 
  | 'literature';

interface WorksheetTypeOption {
  id: WorksheetType;
  name: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const worksheetTypes: WorksheetTypeOption[] = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Arithmetic, algebra, geometry, and more',
    icon: <Calculator className="h-6 w-6" />,
    colorClass: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'language',
    name: 'Language Arts',
    description: 'Grammar, vocabulary, and writing',
    icon: <Languages className="h-6 w-6" />,
    colorClass: 'bg-green-100 text-green-600'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Biology, chemistry, and physics',
    icon: <Atom className="h-6 w-6" />,
    colorClass: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Events, people, and civilizations',
    icon: <GraduationCap className="h-6 w-6" />,
    colorClass: 'bg-amber-100 text-amber-600'
  },
  {
    id: 'geography',
    name: 'Geography',
    description: 'Maps, countries, and landforms',
    icon: <Globe className="h-6 w-6" />,
    colorClass: 'bg-cyan-100 text-cyan-600'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Notes, rhythm, and instruments',
    icon: <Music className="h-6 w-6" />,
    colorClass: 'bg-pink-100 text-pink-600'
  },
  {
    id: 'art',
    name: 'Art',
    description: 'Techniques, history, and appreciation',
    icon: <PenTool className="h-6 w-6" />,
    colorClass: 'bg-rose-100 text-rose-600'
  },
  {
    id: 'literature',
    name: 'Literature',
    description: 'Reading comprehension and analysis',
    icon: <BookOpen className="h-6 w-6" />,
    colorClass: 'bg-indigo-100 text-indigo-600'
  }
];

interface TypeSelectorProps {
  selectedType: WorksheetType | null;
  onSelectType: (type: WorksheetType) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Worksheet Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {worksheetTypes.map((type) => (
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

export default TypeSelector;
