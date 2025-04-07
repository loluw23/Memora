
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Printer, FileText, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  isReady: boolean;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ isReady }) => {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    // In a real application, this would handle the actual export
    toast({
      title: `Exporting as ${format}`,
      description: "Your worksheet is being prepared for download.",
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Export Options</h3>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              disabled={!isReady}
              onClick={() => handleExport('PDF')}
            >
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download as PDF</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              disabled={!isReady}
              onClick={() => handleExport('Text')}
            >
              <FileText className="h-4 w-4" />
              Text
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download as plain text</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              disabled={!isReady}
              onClick={() => handleExport('Word')}
            >
              <Download className="h-4 w-4" />
              Word
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download as Word document</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              disabled={!isReady}
              onClick={() => handleExport('Print')}
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>Print worksheet</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ExportOptions;
