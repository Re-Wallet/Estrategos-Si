import React from 'react';
import { ActiveView } from '../../types';

interface SectionPlaceholderViewProps {
  view: ActiveView;
  onNavigateHome: () => void;
  onOpenNewVoucher?: (type: 'venta' | 'compra') => void;
}

export const SectionPlaceholderView: React.FC<SectionPlaceholderViewProps> = () => {
  // Sin diseños ni acciones previas por el momento, limpio para desarrollar de a uno
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-slate-200/60 min-h-[350px] shadow-xs" />
      </div>
    </div>
  );
};
