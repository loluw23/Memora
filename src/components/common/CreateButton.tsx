
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-memora-purple shadow-lg hover:bg-memora-purple-dark hover:-translate-y-1 transition-all duration-300 animate-fade-in z-50"
      style={{ animationDelay: '1s' }}
    >
      <Plus size={24} />
    </Button>
  );
};

export default CreateButton;
