
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  BookOpen, 
  Languages, 
  Atom, 
  GraduationCap, 
  Globe, 
  Music, 
  PenTool,
  Shapes,
  Activity,
  CircleSquare,
  Binary,
  Award
} from 'lucide-react';

export type WorksheetSubject = 
  | 'math' 
  | 'language' 
  | 'science' 
  | 'history' 
  | 'geography' 
  | 'music' 
  | 'art' 
  | 'literature'
  | 'computerscience'
  | 'economics'
  | 'physics'
  | 'chemistry';

interface SubjectOption {
  id: WorksheetSubject;
  name: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const subjects: SubjectOption[] = [
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
    id: 'physics',
    name: 'Physics',
    description: 'Forces, motion, and energy',
    icon: <Activity className="h-6 w-6" />,
    colorClass: 'bg-red-100 text-red-600'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Elements, compounds, and reactions',
    icon: <CircleSquare className="h-6 w-6" />,
    colorClass: 'bg-emerald-100 text-emerald-600'
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
  },
  {
    id: 'computerscience',
    name: 'Computer Science',
    description: 'Programming, algorithms, and logic',
    icon: <Binary className="h-6 w-6" />,
    colorClass: 'bg-slate-100 text-slate-600'
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'Markets, money, and economic systems',
    icon: <Award className="h-6 w-6" />,
    colorClass: 'bg-orange-100 text-orange-600'
  }
];

interface SubjectSelectorProps {
  selectedSubject: WorksheetSubject | null;
  onSelectSubject: (subject: WorksheetSubject) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubject, onSelectSubject }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Subject</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <Card 
            key={subject.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSubject === subject.id ? 'ring-2 ring-memora-purple shadow-sm' : ''
            }`}
            onClick={() => onSelectSubject(subject.id)}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${subject.colorClass}`}>
                {subject.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{subject.name}</h4>
                <p className="text-xs text-muted-foreground">{subject.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
