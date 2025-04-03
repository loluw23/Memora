
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

interface QuestionType {
  id: string;
  question: string;
  type: 'short-answer' | 'long-answer' | 'multiple-choice';
  choices?: string[];
  points: number;
}

const CreateWorksheet = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);

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

    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please add at least one question to your worksheet",
        variant: "destructive",
      });
      return;
    }

    // Here we would normally save the worksheet to a database
    toast({
      title: "Worksheet Created",
      description: "Your worksheet has been saved successfully",
    });

    // Reset form
    setTitle('');
    setDescription('');
    setQuestions([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Worksheet</CardTitle>
          <CardDescription>
            Design a worksheet with different question types for students to complete
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Questions</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addQuestion('short-answer')}
          >
            <Plus size={16} className="mr-1" /> Short Answer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addQuestion('long-answer')}
          >
            <Plus size={16} className="mr-1" /> Long Answer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addQuestion('multiple-choice')}
          >
            <Plus size={16} className="mr-1" /> Multiple Choice
          </Button>
        </div>
      </div>

      {questions.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <FilePlus className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No questions added yet</p>
            <p className="text-sm text-muted-foreground mb-4">Add different types of questions using the buttons above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span className="bg-memora-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <CardTitle className="text-base">
                      {question.type === 'short-answer' 
                        ? 'Short Answer Question' 
                        : question.type === 'long-answer'
                          ? 'Long Answer Question'
                          : 'Multiple Choice Question'
                      }
                    </CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeQuestion(question.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Textarea 
                    placeholder="Enter your question"
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    rows={2}
                  />
                </div>
                
                {question.type === 'multiple-choice' && question.choices && (
                  <div className="space-y-3">
                    <Label>Answer Choices</Label>
                    {question.choices.map((choice, choiceIndex) => (
                      <div key={choiceIndex} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-input flex items-center justify-center text-xs font-medium">
                          {String.fromCharCode(65 + choiceIndex)}
                        </div>
                        <Input 
                          placeholder={`Choice ${String.fromCharCode(65 + choiceIndex)}`}
                          value={choice}
                          onChange={(e) => updateChoice(question.id, choiceIndex, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Label>Points</Label>
                  <Input 
                    type="number" 
                    min="1"
                    className="w-20"
                    value={question.points}
                    onChange={(e) => updateQuestion(question.id, 'points', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-memora-purple hover:bg-memora-purple/90">
            Save Worksheet
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateWorksheet;
