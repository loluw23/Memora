
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { FilePlus, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WorksheetSubject } from './SubjectSelector';
import { WorksheetType } from './WorksheetTypeSelector';
import { Separator } from '@/components/ui/separator';
import SubjectSelector from './SubjectSelector';
import WorksheetTypeSelector from './WorksheetTypeSelector';
import MathOptions from './MathOptions';
import ExportOptions from './ExportOptions';
import GeneratedWorksheetView from './GeneratedWorksheetView';
import MathGridWorksheet from './MathGridWorksheet';
import { generateMathWorksheet } from '@/services/worksheetGenerator';

interface QuestionType {
  id: string;
  question: string;
  type: 'short-answer' | 'long-answer' | 'multiple-choice';
  choices?: string[];
  points: number;
}

const CreateWorksheet = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [worksheetSubject, setWorksheetSubject] = useState<WorksheetSubject>('math');
  const [worksheetType, setWorksheetType] = useState<WorksheetType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [mathOptions, setMathOptions] = useState({
    grade: '4',
    difficulty: 'medium',
    questionCount: 10,
    spacing: 3,
    showAnswerKey: true,
    topics: ['addition', 'subtraction'],
    specialMessage: '',
    instructions: '',
    includeGeometricShapes: false,
    include3dFigures: false,
    coverAllTopics: false
  });
  const [mathGridOptions, setMathGridOptions] = useState({
    numProblems: 100,
    maxNumber: 20,
    minNumber: 0,
    columns: 4,
    operations: ['addition', 'subtraction', 'multiplication', 'division'],
    showAnswers: false
  });
  const [generatedWorksheet, setGeneratedWorksheet] = useState<any>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const addQuestion = (type: 'short-answer' | 'long-answer' | 'multiple-choice') => {
    const newQuestion: QuestionType = {
      id: Date.now().toString(),
      question: '',
      type,
      points: 1,
      ...(type === 'multiple-choice' ? { choices: ['', '', '', ''] } : {})
    };
    
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: string, value: string | string[]) => {
    setQuestions(
      questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateChoice = (questionId: string, choiceIndex: number, value: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId && q.choices) {
          const newChoices = [...q.choices];
          newChoices[choiceIndex] = value;
          return { ...q, choices: newChoices };
        }
        return q;
      })
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title for your worksheet",
        variant: "destructive",
      });
      return;
    }

    if (worksheetSubject !== 'math' && questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please add at least one question to your worksheet",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Worksheet Created",
      description: "Your worksheet has been saved successfully",
    });

    setTitle('');
    setDescription('');
    setQuestions([]);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && worksheetType) {
      setStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
      setWorksheetType(null);
    }
  };
  
  const handleGenerateWorksheet = () => {
    if (worksheetSubject === 'math') {
      try {
        if (worksheetType === 'grid') {
          // We'll use the MathGridWorksheet component directly
          setIsPreviewMode(true);
        } else {
          const instructions = mathOptions.instructions || `Complete the following math problems. Show your work when necessary.`;
          const worksheetTitle = title || `Grade ${mathOptions.grade} ${mathOptions.difficulty.charAt(0).toUpperCase() + mathOptions.difficulty.slice(1)} Math Worksheet`;
          
          const worksheet = generateMathWorksheet(
            mathOptions,
            worksheetTitle,
            instructions,
            mathOptions.specialMessage
          );
          
          setGeneratedWorksheet(worksheet);
          setIsPreviewMode(true);
        }
        
        toast({
          title: "Worksheet Generated",
          description: "Your math worksheet has been created successfully",
        });
      } catch (error) {
        toast({
          title: "Generation Error",
          description: "There was an error generating your worksheet. Please try again.",
          variant: "destructive",
        });
        console.error("Worksheet generation error:", error);
      }
    } else {
      toast({
        title: "Not Implemented",
        description: `Generation for ${worksheetSubject} worksheets is not yet implemented.`,
        variant: "destructive",
      });
    }
  };
  
  const handleEditWorksheet = () => {
    setIsPreviewMode(false);
  };

  const renderGridOptions = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Math Grid Options</CardTitle>
          <CardDescription>Customize your math grid worksheet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numProblems">Number of Problems</Label>
              <Input
                id="numProblems"
                type="number"
                min="1"
                max="200"
                value={mathGridOptions.numProblems}
                onChange={(e) => setMathGridOptions({
                  ...mathGridOptions,
                  numProblems: parseInt(e.target.value)
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Input
                id="columns"
                type="number"
                min="1"
                max="8"
                value={mathGridOptions.columns}
                onChange={(e) => setMathGridOptions({
                  ...mathGridOptions,
                  columns: parseInt(e.target.value)
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxNumber">Maximum Number</Label>
              <Input
                id="maxNumber"
                type="number"
                min="1"
                max="1000"
                value={mathGridOptions.maxNumber}
                onChange={(e) => setMathGridOptions({
                  ...mathGridOptions,
                  maxNumber: parseInt(e.target.value)
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minNumber">Minimum Number</Label>
              <Input
                id="minNumber"
                type="number"
                min="0"
                max="100"
                value={mathGridOptions.minNumber}
                onChange={(e) => setMathGridOptions({
                  ...mathGridOptions,
                  minNumber: parseInt(e.target.value)
                })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Operations</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="addition" 
                  checked={mathGridOptions.operations.includes('addition')}
                  onCheckedChange={(checked) => {
                    const newOperations = checked 
                      ? [...mathGridOptions.operations, 'addition'] 
                      : mathGridOptions.operations.filter(op => op !== 'addition');
                    
                    setMathGridOptions({...mathGridOptions, operations: newOperations});
                  }}
                />
                <Label htmlFor="addition">Addition</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="subtraction" 
                  checked={mathGridOptions.operations.includes('subtraction')}
                  onCheckedChange={(checked) => {
                    const newOperations = checked 
                      ? [...mathGridOptions.operations, 'subtraction'] 
                      : mathGridOptions.operations.filter(op => op !== 'subtraction');
                    
                    setMathGridOptions({...mathGridOptions, operations: newOperations});
                  }}
                />
                <Label htmlFor="subtraction">Subtraction</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="multiplication" 
                  checked={mathGridOptions.operations.includes('multiplication')}
                  onCheckedChange={(checked) => {
                    const newOperations = checked 
                      ? [...mathGridOptions.operations, 'multiplication'] 
                      : mathGridOptions.operations.filter(op => op !== 'multiplication');
                    
                    setMathGridOptions({...mathGridOptions, operations: newOperations});
                  }}
                />
                <Label htmlFor="multiplication">Multiplication</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="division" 
                  checked={mathGridOptions.operations.includes('division')}
                  onCheckedChange={(checked) => {
                    const newOperations = checked 
                      ? [...mathGridOptions.operations, 'division'] 
                      : mathGridOptions.operations.filter(op => op !== 'division');
                    
                    setMathGridOptions({...mathGridOptions, operations: newOperations});
                  }}
                />
                <Label htmlFor="division">Division</Label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showAnswers" 
              checked={mathGridOptions.showAnswers}
              onCheckedChange={(checked) => setMathGridOptions({
                ...mathGridOptions,
                showAnswers: !!checked
              })}
            />
            <Label htmlFor="showAnswers">Show Answer Key</Label>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStepContent = () => {
    if (isPreviewMode) {
      if (worksheetType === 'grid') {
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Math Grid Worksheet</CardTitle>
                <CardDescription className="mt-1">
                  Preview your worksheet before saving or exporting
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handleEditWorksheet}>
                Edit Settings
              </Button>
            </div>
            
            <MathGridWorksheet 
              title={title || "Math Practice Worksheet"}
              operations={mathGridOptions.operations as any}
              numProblems={mathGridOptions.numProblems}
              maxNumber={mathGridOptions.maxNumber}
              minNumber={mathGridOptions.minNumber}
              columns={mathGridOptions.columns}
              showAnswers={mathGridOptions.showAnswers}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Save or Export Worksheet</CardTitle>
              </CardHeader>
              <CardContent>
                <ExportOptions isReady={true} />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleEditWorksheet}>
                  Back to Editing
                </Button>
                <Button 
                  onClick={handleSave} 
                  className="bg-memora-purple hover:bg-memora-purple/90"
                >
                  Save Worksheet
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      } else if (generatedWorksheet) {
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Worksheet</CardTitle>
                <CardDescription className="mt-1">
                  Preview your worksheet before saving or exporting
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handleEditWorksheet}>
                Edit Settings
              </Button>
            </div>
            
            <GeneratedWorksheetView 
              worksheet={generatedWorksheet} 
              showAnswers={mathOptions.showAnswerKey}
              spacing={mathOptions.spacing} 
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Save or Export Worksheet</CardTitle>
              </CardHeader>
              <CardContent>
                <ExportOptions isReady={true} />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleEditWorksheet}>
                  Back to Editing
                </Button>
                <Button 
                  onClick={handleSave} 
                  className="bg-memora-purple hover:bg-memora-purple/90"
                >
                  Save Worksheet
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      }
      
      return null;
    }
    
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Create New Worksheet</CardTitle>
              <CardDescription>
                Select the subject for your worksheet
              </CardDescription>
            </CardHeader>
            
            <SubjectSelector 
              selectedSubject={worksheetSubject} 
              onSelectSubject={setWorksheetSubject} 
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNextStep}
                className="bg-memora-purple hover:bg-memora-purple/90"
              >
                Continue
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Select Worksheet Type</CardTitle>
                <CardDescription className="mt-1">
                  Choose the type of {worksheetSubject} worksheet to create
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handlePreviousStep}>
                Change Subject
              </Button>
            </div>
            
            <WorksheetTypeSelector 
              selectedSubject={worksheetSubject}
              selectedType={worksheetType}
              onSelectType={setWorksheetType}
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNextStep}
                className="bg-memora-purple hover:bg-memora-purple/90"
                disabled={!worksheetType}
              >
                Continue with {worksheetType ? worksheetType.charAt(0).toUpperCase() + worksheetType.slice(1) : ''} Worksheet
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {worksheetSubject.charAt(0).toUpperCase() + worksheetSubject.slice(1)} {" "}
                  {worksheetType && worksheetType.charAt(0).toUpperCase() + worksheetType.slice(1)} Worksheet
                </CardTitle>
                <CardDescription className="mt-1">
                  Customize your worksheet settings
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handlePreviousStep}>
                Change Type
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Worksheet Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter a title for your worksheet" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Add a description for your worksheet"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
            
            {worksheetSubject === 'math' && worksheetType === 'grid' && renderGridOptions()}
            
            {worksheetSubject === 'math' && worksheetType !== 'grid' && (
              <Card>
                <CardHeader>
                  <CardTitle>Math Worksheet Options</CardTitle>
                  <CardDescription>Customize the math worksheet settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <MathOptions options={mathOptions} setOptions={setMathOptions} />
                </CardContent>
              </Card>
            )}
            
            {worksheetSubject !== 'math' && (
              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon</CardTitle>
                  <CardDescription>
                    Detailed options for {worksheetSubject} worksheets are coming soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 text-center text-muted-foreground">
                    Please check back later for more customization options.
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button 
                className="bg-memora-purple hover:bg-memora-purple/90" 
                onClick={handleGenerateWorksheet}
              >
                Generate Worksheet
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStepContent()}
    </div>
  );
};

export default CreateWorksheet;
