'use client';

import React from 'react';
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
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-emerald-200/50 shadow-xl ${className}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between mb-4 group">
        {header}
        <div className="flex items-center gap-2 text-emerald-600/80 hover:text-emerald-700 group-hover:scale-110 transition-all duration-300">
          {isExpanded ? (
            <>
              <ChevronUp className="h-5 w-5" />
              <span className="text-sm font-semibold">Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5" />
              <span className="text-sm font-semibold">More</span>
            </>
          )}
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

