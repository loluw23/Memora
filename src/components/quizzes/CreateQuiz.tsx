
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateQuizProps {
  onClose: () => void;
  onSave: (quiz: any) => void;
}

const CreateQuiz = ({ onClose, onSave }: CreateQuizProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: 0 
    }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions, 
      { 
        question: '', 
        options: ['', '', '', ''], 
        correctAnswer: 0 
      }
    ]);
  };
  
  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "A quiz must have at least one question",
        variant: "destructive",
      });
    }
  };
  
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };
  
  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };
  
  const handleCorrectAnswerChange = (questionIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !category) {
      toast({
        title: "Missing information",
        description: "Please provide a title and category for the quiz",
        variant: "destructive",
      });
      return;
    }
    
    // Check that all questions have content
    const incompleteQuestion = questions.find(
      q => !q.question || q.options.some(opt => !opt)
    );
    
    if (incompleteQuestion) {
      toast({
        title: "Incomplete questions",
        description: "Please fill in all questions and answer options",
        variant: "destructive",
      });
      return;
    }
    
    const newQuiz = {
      title,
      category,
      description,
      questions,
      questionCount: questions.length,
      estimatedTime: `${Math.ceil(questions.length * 1.5)} min`,
    };
    
    onSave(newQuiz);
    toast({
      title: "Quiz created",
      description: "Your new quiz has been added to your collection",
    });
    
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Create New Quiz</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input 
                id="title" 
                placeholder="Enter quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Enter a brief description of the quiz"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Questions</h3>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={handleAddQuestion}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            {questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="border border-border">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Question {questionIndex + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQuestion(questionIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Input 
                      placeholder="Enter your question"
                      value={question.question}
                      onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    
                    <RadioGroup 
                      value={question.correctAnswer.toString()} 
                      onValueChange={(value) => handleCorrectAnswerChange(questionIndex, parseInt(value))}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex space-x-2 items-center">
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value={optionIndex.toString()} />
                            </FormControl>
                            <Input 
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                              className="flex-1"
                            />
                          </FormItem>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <p className="text-xs text-muted-foreground">
                      Select the radio button next to the correct answer
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="bg-memora-purple">
            <Plus className="mr-2 h-4 w-4" /> Create Quiz
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateQuiz;
