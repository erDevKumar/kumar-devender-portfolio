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
    <div className={`glass-card rounded-3xl p-6 md:p-8 hover:shadow-soft-lg transition-all duration-500 border border-emerald-200/40 shadow-soft-lg card-hover ${className}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between mb-4 group focus-visible-ring">
        {header}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/50 text-emerald-600/80 hover:text-emerald-700 group-hover:bg-emerald-100/50 group-hover:scale-105 transition-all duration-300">
          {isExpanded ? (
            <>
              <ChevronUp className="h-5 w-5" />
              <span className="text-sm font-semibold hidden sm:inline">Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5" />
              <span className="text-sm font-semibold hidden sm:inline">More</span>
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

