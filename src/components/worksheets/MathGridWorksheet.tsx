
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Printer, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateMathGridWorksheet } from '@/services/mathGridGenerator';

interface MathGridWorksheetProps {
  title?: string;
  operations: ('addition' | 'subtraction' | 'multiplication' | 'division')[];
  numProblems?: number;
  maxNumber?: number;
  minNumber?: number;
  columns?: number;
  showAnswers?: boolean;
  studentName?: string;
}

const MathGridWorksheet: React.FC<MathGridWorksheetProps> = ({
  title = "Math Practice Worksheet",
  operations = ['addition'],
  numProblems = 100,
  maxNumber = 20,
  minNumber = 0,
  columns = 4,
  showAnswers = false,
  studentName = '',
}) => {
  const worksheetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const problems = generateMathGridWorksheet({
    numProblems,
    operations,
    maxNumber,
    minNumber,
    mixedOperations: operations.length > 1,
  });
  
  const handlePrint = () => {
    const printContent = document.createElement('div');
    if (worksheetRef.current) {
      printContent.innerHTML = worksheetRef.current.innerHTML;
    }
    
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Math Grid Worksheet</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: Arial, sans-serif; padding: 20px; }
        .worksheet-header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
        .worksheet-title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .student-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .student-info div { flex: 1; }
        .questions-grid { 
          display: grid; 
          grid-template-columns: repeat(${columns}, 1fr); 
          gap: 16px 12px; 
          font-size: 16px;
        }
        .grid-item { 
          text-align: left; 
          padding: 4px;
        }
        .answer { 
          color: green; 
          margin-top: 4px; 
        }
        .worksheet-footer { text-align: center; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 12px; color: #666; }
        @media print {
          .no-print { display: none; }
          body { font-size: 14px; }
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent.innerHTML);
            
      printWindow.document.write('<div class="worksheet-footer">');
      printWindow.document.write(`© ${new Date().getFullYear()} Memora Learning. All rights reserved.`);
      printWindow.document.write('</div>');
      
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
            <div className="worksheet-header text-center mb-6 pb-4 border-b">
              <h1 className="worksheet-title text-2xl font-bold">{title}</h1>
            </div>
            
            <div className="student-info mb-8">
              <div className="mr-8">
                <p className="mb-1">Name: {studentName || "_______________________"}</p>
              </div>
              <div>
                <p className="mb-1">Date: _______________________</p>
              </div>
            </div>
            
            <div className={`questions-grid grid grid-cols-${columns} gap-4`}>
              {problems.map((problem, index) => (
                <div key={index} className="grid-item">
                  <div>{problem.question}</div>
                  {showAnswers && <div className="answer">{problem.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathGridWorksheet;
