'use client'
import { Mouse, Move, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Instructions = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 glass-panel px-4 py-3 flex items-center gap-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Move className="w-4 h-4" />
        <span className="text-xs">{t('instructions.drag')}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <ZoomIn className="w-4 h-4" />
        <span className="text-xs">{t('instructions.scroll')}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Mouse className="w-4 h-4" />
        <span className="text-xs">{t('instructions.click')}</span>
      </div>
    </div>
  );
};
