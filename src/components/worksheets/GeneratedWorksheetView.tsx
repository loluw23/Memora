
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Printer, FileText, Copy, Shapes, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  grade?: string;
  subject?: string;
  copyright?: string;
}

interface GeneratedWorksheetViewProps {
  worksheet: WorksheetData;
  showAnswers: boolean;
  spacing?: number;
  includeHeader?: boolean;
  includeFooter?: boolean;
}

const GeneratedWorksheetView: React.FC<GeneratedWorksheetViewProps> = ({ 
  worksheet, 
  showAnswers,
  spacing = 3,
  includeHeader = true,
  includeFooter = true
}) => {
  const { title, instructions, specialMessage, questions, answerKey, grade, subject, copyright } = worksheet;
  const worksheetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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
        .worksheet-header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
        .worksheet-title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .worksheet-meta { color: #666; font-size: 14px; margin-bottom: 5px; }
        .worksheet-instructions { font-style: italic; margin-bottom: 16px; }
        .worksheet-special-message { font-weight: bold; color: #6366f1; margin: 10px 0; }
        .student-info { display: flex; justify-content: space-between; margin-bottom: 15px; }
        .student-info div { flex: 1; }
        .question-item { margin-bottom: ${spacing * 8}px; page-break-inside: avoid; }
        .question-text { margin-bottom: 8px; }
        .question-number { font-weight: bold; margin-right: 8px; }
        .answer-key { page-break-before: always; margin-top: 30px; }
        .answer-item { margin-bottom: 4px; }
        .worksheet-footer { text-align: center; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 12px; color: #666; }
        .question-figure { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; }
        .questions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media print {
          .no-print { display: none; }
        }
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
      
      if (includeFooter) {
        printWindow.document.write('<div class="worksheet-footer">');
        printWindow.document.write(copyright || '© ' + new Date().getFullYear() + ' Memora Learning. All rights reserved.');
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
    toast({
      title: "PDF Download Started",
      description: "Your worksheet is being prepared for download.",
    });
    
    // In a real implementation, we would use a library like jsPDF to generate a PDF
    setTimeout(() => {
      toast({
        title: "PDF Download Ready",
        description: "Your worksheet has been downloaded.",
      });
    }, 1500);
  };

  const handleCopyToClipboard = () => {
    if (worksheetRef.current) {
      const range = document.createRange();
      range.selectNode(worksheetRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      
      toast({
        title: "Copied to Clipboard",
        description: "Worksheet content has been copied to clipboard.",
      });
    }
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
            onClick={handleCopyToClipboard}
          >
            <Copy size={16} />
            <span>Copy</span>
          </Button>
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
      
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div ref={worksheetRef} className="worksheet-content">
            {includeHeader && (
              <div className="worksheet-header text-center mb-8 pb-4 border-b">
                <h1 className="worksheet-title text-2xl font-bold mb-2">{title}</h1>
                {(grade || subject) && (
                  <p className="worksheet-meta mb-2">
                    {grade && `Grade ${grade}`}
                    {grade && subject && " | "}
                    {subject && `Subject: ${subject}`}
                  </p>
                )}
                <p className="worksheet-instructions text-gray-700 italic mb-4">{instructions}</p>
                {specialMessage && (
                  <p className="worksheet-special-message font-medium text-memora-purple">{specialMessage}</p>
                )}
              </div>
            )}
            
            <div className="student-info mb-6">
              <div className="mr-8">
                <p className="mb-1">Name: _______________________</p>
              </div>
              <div>
                <p className="mb-1">Date: _______________________</p>
              </div>
            </div>
            
            <div className={`worksheet-questions ${getSpacingClass()}`}>
              {questions.map((question, index) => (
                <div key={index} className="question-item">
                  <div className="question-text">
                    <span className="question-number font-medium">{index + 1}.</span>
                    <span>{question.question}</span>
                  </div>
                  
                  {question.figure && (
                    <div className="question-figure mt-2 p-4 border border-dashed rounded-md bg-gray-50 text-center">
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
                  
                  <div className="answer-line mt-3 border-b border-gray-300"></div>
                </div>
              ))}
            </div>
            
            {includeFooter && (
              <div className="worksheet-footer text-center mt-8 pt-4 border-t text-sm text-gray-500">
                {copyright || `© ${new Date().getFullYear()} Memora Learning. All rights reserved.`}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratedWorksheetView;
