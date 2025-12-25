'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleProps {
  isExpanded: boolean;
  onToggle: () => void;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Collapsible({ isExpanded, onToggle, header, children, className = '' }: CollapsibleProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 hover:shadow-2xl transition-all duration-500 border border-emerald-200/30 ${className}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between mb-4">
        {header}
        <div className="flex items-center gap-1 text-emerald-600/70 hover:text-emerald-700">
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span className="text-xs">Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span className="text-xs">More</span>
            </>
          )}
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

