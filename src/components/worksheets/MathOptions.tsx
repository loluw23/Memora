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
import { Textarea } from '@/components/ui/textarea';

interface MathOptionsProps {
  options: {
    grade: string;
    difficulty: string;
    questionCount: number;
    spacing: number;
    showAnswerKey: boolean;
    topics: string[];
    specialMessage: string;
    instructions: string;
    includeGeometricShapes: boolean;
    include3dFigures: boolean;
    coverAllTopics: boolean;
  };
  setOptions: React.Dispatch<React.SetStateAction<{
    grade: string;
    difficulty: string;
    questionCount: number;
    spacing: number;
    showAnswerKey: boolean;
    topics: string[];
    specialMessage: string;
    instructions: string;
    includeGeometricShapes: boolean;
    include3dFigures: boolean;
    coverAllTopics: boolean;
  }>>;
}

const mathTopicsByGrade: Record<string, { id: string; label: string }[]> = {
  "1": [
    { id: 'counting', label: 'Counting' },
    { id: 'addition', label: 'Addition' },
    { id: 'subtraction', label: 'Subtraction' },
    { id: 'shapes', label: 'Basic Shapes' },
    { id: 'patterns', label: 'Patterns' },
  ],
  "2": [
    { id: 'addition', label: 'Addition' },
    { id: 'subtraction', label: 'Subtraction' },
    { id: 'place_value', label: 'Place Value' },
    { id: 'measurement', label: 'Measurement' },
    { id: 'time', label: 'Time' },
    { id: 'money', label: 'Money' },
  ],
  "3": [
    { id: 'multiplication', label: 'Multiplication' },
    { id: 'division', label: 'Division' },
    { id: 'fractions', label: 'Fractions' },
    { id: 'measurement', label: 'Measurement' },
    { id: 'geometry', label: 'Geometry' },
  ],
  "4": [
    { id: 'multiplication', label: 'Multiplication' },
    { id: 'division', label: 'Division' },
    { id: 'fractions', label: 'Fractions' },
    { id: 'decimals', label: 'Decimals' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'measurement', label: 'Measurement' },
  ],
  "5": [
    { id: 'fractions', label: 'Fractions' },
    { id: 'decimals', label: 'Decimals' },
    { id: 'percentages', label: 'Percentages' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'measurement', label: 'Measurement' },
    { id: 'algebra', label: 'Pre-Algebra' },
  ],
  "6": [
    { id: 'ratios', label: 'Ratios & Proportions' },
    { id: 'expressions', label: 'Expressions & Equations' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'statistics', label: 'Statistics' },
  ],
  "7": [
    { id: 'ratios', label: 'Ratios & Proportions' },
    { id: 'expressions', label: 'Expressions & Equations' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'probability', label: 'Probability' },
  ],
  "8": [
    { id: 'expressions', label: 'Expressions & Equations' },
    { id: 'functions', label: 'Functions' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'statistics', label: 'Statistics & Probability' },
    { id: 'linear_algebra', label: 'Linear Algebra' },
  ],
  "9": [
    { id: 'algebra', label: 'Algebra I' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'statistics', label: 'Statistics' },
  ],
  "10": [
    { id: 'quadratics', label: 'Quadratic Equations' },
    { id: 'functions', label: 'Functions' },
    { id: 'trigonometry', label: 'Trigonometry' },
    { id: 'geometry', label: 'Geometry' },
  ],
  "11": [
    { id: 'algebra_ii', label: 'Algebra II' },
    { id: 'precalculus', label: 'Pre-Calculus' },
    { id: 'trigonometry', label: 'Trigonometry' },
    { id: 'statistics', label: 'Statistics' },
  ],
};

const commonMathTopics = [
  { id: 'word_problems', label: 'Word Problems' },
  { id: 'mental_math', label: 'Mental Math' },
  { id: 'logical_reasoning', label: 'Logical Reasoning' },
];

const MathOptions: React.FC<MathOptionsProps> = ({ options, setOptions }) => {
  const gradeSpecificTopics = mathTopicsByGrade[options.grade] || [];
  const allTopics = [...gradeSpecificTopics, ...commonMathTopics];

  const handleTopicToggle = (topicId: string) => {
    if (options.topics.includes(topicId)) {
      setOptions({
        ...options,
        topics: options.topics.filter(t => t !== topicId),
        coverAllTopics: false,
      });
    } else {
      setOptions({
        ...options,
        topics: [...options.topics, topicId]
      });
    }
  };

  const handleCoverAllTopics = (checked: boolean) => {
    if (checked) {
      setOptions({
        ...options,
        topics: allTopics.map(t => t.id),
        coverAllTopics: true
      });
    } else {
      setOptions({
        ...options,
        coverAllTopics: false
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
            onValueChange={(value) => {
              setOptions({
                ...options,
                grade: value,
                topics: options.coverAllTopics ? 
                  [...(mathTopicsByGrade[value] || []), ...commonMathTopics].map(t => t.id) : 
                  []
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select grade level" />
            </SelectTrigger>
            <SelectContent>
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
      
      <Accordion type="multiple" className="w-full" defaultValue={["topics", "appearance", "advanced"]}>
        <AccordionItem value="topics">
          <AccordionTrigger>Math Topics</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="cover-all-topics" 
                  checked={options.coverAllTopics}
                  onCheckedChange={(checked) => handleCoverAllTopics(checked === true)}
                />
                <Label htmlFor="cover-all-topics" className="font-medium">Cover all appropriate topics for Grade {options.grade}</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {allTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`topic-${topic.id}`} 
                      checked={options.topics.includes(topic.id) || options.coverAllTopics}
                      onCheckedChange={() => !options.coverAllTopics && handleTopicToggle(topic.id)}
                      disabled={options.coverAllTopics}
                    />
                    <Label htmlFor={`topic-${topic.id}`}>{topic.label}</Label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Label className="font-medium">Geometry Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-shapes" 
                      checked={options.includeGeometricShapes}
                      onCheckedChange={(checked) => 
                        setOptions({...options, includeGeometricShapes: checked === true})}
                    />
                    <Label htmlFor="include-shapes">Include geometric shapes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-3d" 
                      checked={options.include3dFigures}
                      onCheckedChange={(checked) => 
                        setOptions({...options, include3dFigures: checked === true})}
                    />
                    <Label htmlFor="include-3d">Include 3D figures</Label>
                  </div>
                </div>
              </div>
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
        
        <AccordionItem value="advanced">
          <AccordionTrigger>Additional Options</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructions">Worksheet Instructions</Label>
                <Textarea 
                  id="instructions"
                  placeholder="Enter instructions for the worksheet"
                  value={options.instructions}
                  onChange={(e) => setOptions({...options, instructions: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="special-message">Special Message</Label>
                <Textarea 
                  id="special-message"
                  placeholder="Enter a special message or note (e.g., 'Good luck!' or 'Keep practicing!')"
                  value={options.specialMessage}
                  onChange={(e) => setOptions({...options, specialMessage: e.target.value})}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  This message will appear at the top or bottom of the worksheet
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MathOptions;
