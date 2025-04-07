
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

interface MathOptionsProps {
  options: {
    grade: string;
    difficulty: string;
    questionCount: number;
    spacing: number;
    showAnswerKey: boolean;
    topics: string[];
  };
  setOptions: React.Dispatch<React.SetStateAction<{
    grade: string;
    difficulty: string;
    questionCount: number;
    spacing: number;
    showAnswerKey: boolean;
    topics: string[];
  }>>;
}

const mathTopics = [
  { id: 'addition', label: 'Addition' },
  { id: 'subtraction', label: 'Subtraction' },
  { id: 'multiplication', label: 'Multiplication' },
  { id: 'division', label: 'Division' },
  { id: 'fractions', label: 'Fractions' },
  { id: 'decimals', label: 'Decimals' },
  { id: 'percentages', label: 'Percentages' },
  { id: 'geometry', label: 'Geometry' },
  { id: 'algebra', label: 'Algebra' },
];

const MathOptions: React.FC<MathOptionsProps> = ({ options, setOptions }) => {
  const handleTopicToggle = (topicId: string) => {
    if (options.topics.includes(topicId)) {
      setOptions({
        ...options,
        topics: options.topics.filter(t => t !== topicId)
      });
    } else {
      setOptions({
        ...options,
        topics: [...options.topics, topicId]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Grade Level</Label>
          <Select
            value={options.grade}
            onValueChange={(value) => setOptions({...options, grade: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select grade level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="K">Kindergarten</SelectItem>
              <SelectItem value="1">1st Grade</SelectItem>
              <SelectItem value="2">2nd Grade</SelectItem>
              <SelectItem value="3">3rd Grade</SelectItem>
              <SelectItem value="4">4th Grade</SelectItem>
              <SelectItem value="5">5th Grade</SelectItem>
              <SelectItem value="6">6th Grade</SelectItem>
              <SelectItem value="7">7th Grade</SelectItem>
              <SelectItem value="8">8th Grade</SelectItem>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={options.difficulty}
            onValueChange={(value) => setOptions({...options, difficulty: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Number of Questions ({options.questionCount})</Label>
          <Slider
            value={[options.questionCount]}
            min={5}
            max={30}
            step={1}
            onValueChange={([value]) => setOptions({...options, questionCount: value})}
          />
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="topics">
          <AccordionTrigger>Math Topics</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mathTopics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`topic-${topic.id}`} 
                    checked={options.topics.includes(topic.id)}
                    onCheckedChange={() => handleTopicToggle(topic.id)}
                  />
                  <Label htmlFor={`topic-${topic.id}`}>{topic.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="appearance">
          <AccordionTrigger>Appearance</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Spacing ({options.spacing})</Label>
                <Slider
                  value={[options.spacing]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={([value]) => setOptions({...options, spacing: value})}
                />
                <p className="text-xs text-muted-foreground">
                  Controls the space between questions (1 = compact, 5 = spacious)
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={options.showAnswerKey}
                  onCheckedChange={(checked) => setOptions({...options, showAnswerKey: checked})}
                />
                <Label>Include answer key</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MathOptions;
