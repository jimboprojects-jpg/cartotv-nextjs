'use client'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ZoomControls = ({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 glass-panel border-border/50 hover:bg-secondary"
        onClick={onZoomIn}
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 glass-panel border-border/50 hover:bg-secondary"
        onClick={onZoomOut}
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 glass-panel border-border/50 hover:bg-secondary"
        onClick={onReset}
        title="Reset View"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};
