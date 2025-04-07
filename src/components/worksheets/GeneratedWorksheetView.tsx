
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Printer, FileText } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
  explanation?: string;
  figure?: string;
}

interface WorksheetData {
  title: string;
  instructions: string;
  specialMessage?: string;
  questions: Question[];
  answerKey: { [key: number]: string };
}

interface GeneratedWorksheetViewProps {
  worksheet: WorksheetData;
  showAnswers: boolean;
  spacing?: number;
}

const GeneratedWorksheetView: React.FC<GeneratedWorksheetViewProps> = ({ 
  worksheet, 
  showAnswers,
  spacing = 3
}) => {
  const { title, instructions, specialMessage, questions, answerKey } = worksheet;
  const worksheetRef = useRef<HTMLDivElement>(null);
  
  // Calculate spacing class based on spacing prop
  const getSpacingClass = () => {
    switch(spacing) {
      case 1: return 'space-y-1';
      case 2: return 'space-y-2';
      case 3: return 'space-y-4';
      case 4: return 'space-y-6';
      case 5: return 'space-y-8';
      default: return 'space-y-4';
    }
  };

  const handlePrint = () => {
    const printContent = document.createElement('div');
    if (worksheetRef.current) {
      printContent.innerHTML = worksheetRef.current.innerHTML;
    }
    
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Math Worksheet</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: Arial, sans-serif; padding: 20px; }
        .worksheet-header { text-align: center; margin-bottom: 20px; }
        .worksheet-title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .worksheet-instructions { font-style: italic; margin-bottom: 16px; }
        .worksheet-special-message { font-weight: bold; color: #6366f1; }
        .question-item { margin-bottom: ${spacing * 8}px; page-break-inside: avoid; }
        .question-text { margin-bottom: 8px; }
        .question-number { font-weight: bold; margin-right: 8px; }
        .answer-key { page-break-before: always; margin-top: 30px; }
        .answer-item { margin-bottom: 4px; }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent.innerHTML);
      
      if (showAnswers) {
        printWindow.document.write('<div class="answer-key">');
        printWindow.document.write('<h2>Answer Key</h2>');
        Object.entries(answerKey).forEach(([number, answer]) => {
          printWindow.document.write(`<div class="answer-item">${number}. ${answer}</div>`);
        });
        printWindow.document.write('</div>');
      }
      
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      
      // Print after a small delay to ensure content is loaded
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleDownloadPDF = () => {
    // In a real implementation, we would use a library like jsPDF to generate a PDF
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Worksheet Preview</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>Print</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleDownloadPDF}
          >
            <Download size={16} />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div ref={worksheetRef} className="worksheet-content">
            <div className="worksheet-header text-center mb-8">
              <h1 className="worksheet-title text-2xl font-bold mb-2">{title}</h1>
              <p className="worksheet-instructions text-gray-700 italic mb-4">{instructions}</p>
              {specialMessage && (
                <p className="worksheet-special-message font-medium text-memora-purple">{specialMessage}</p>
              )}
            </div>
            
            <div className={`worksheet-questions ${getSpacingClass()}`}>
              {questions.map((question, index) => (
                <div key={index} className="question-item">
                  <div className="question-text">
                    <span className="question-number font-medium">{index + 1}.</span>
                    <span>{question.question}</span>
                  </div>
                  
                  {question.figure && (
                    <div className="question-figure mt-2 p-3 border border-dashed rounded-md bg-gray-50 text-center">
                      {question.figure}
                    </div>
                  )}
                  
                  {showAnswers && (
                    <div className="answer-text mt-2 text-green-600">
                      <span className="font-medium">Answer:</span> {question.answer}
                      {question.explanation && (
                        <div className="text-sm text-gray-600 mt-1">{question.explanation}</div>
                      )}
                    </div>
                  )}
                  
                  <div className="answer-line mt-2 border-b border-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratedWorksheetView;
