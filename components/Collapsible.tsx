'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleProps {
  isExpanded: boolean;
  onToggle: () => void;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Collapsible({ isExpanded, onToggle, header, children, className = '' }: CollapsibleProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>('0px');

  useEffect(() => {
    if (!innerRef.current || !contentRef.current) return;

    if (isExpanded) {
      // First, set maxHeight to a large value to allow content to render
      contentRef.current.style.maxHeight = '9999px';
      
      // Then measure the actual height after content is rendered
      const measureHeight = () => {
        if (innerRef.current && contentRef.current) {
          const measuredHeight = innerRef.current.scrollHeight;
          if (measuredHeight > 0) {
            contentRef.current.style.maxHeight = `${measuredHeight}px`;
            setHeight(`${measuredHeight}px`);
          }
        }
      };

      // Measure with multiple attempts to catch dynamic content
      requestAnimationFrame(() => {
        requestAnimationFrame(measureHeight);
      });
      
      const timer1 = setTimeout(measureHeight, 10);
      const timer2 = setTimeout(measureHeight, 50);
      const timer3 = setTimeout(measureHeight, 150);
      const timer4 = setTimeout(measureHeight, 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } else {
      setHeight('0px');
      if (contentRef.current) {
        contentRef.current.style.maxHeight = '0px';
      }
    }
  }, [isExpanded, children]);

  // Watch for content changes when expanded
  useEffect(() => {
    if (!isExpanded || !innerRef.current || !contentRef.current) return;

    const updateHeight = () => {
      if (innerRef.current && contentRef.current) {
        // Temporarily set to large value to measure
        contentRef.current.style.maxHeight = '9999px';
        requestAnimationFrame(() => {
          if (innerRef.current && contentRef.current) {
            const measuredHeight = innerRef.current.scrollHeight;
            if (measuredHeight > 0) {
              contentRef.current.style.maxHeight = `${measuredHeight}px`;
              setHeight(`${measuredHeight}px`);
            }
          }
        });
      }
    };

    const observer = new MutationObserver(() => {
      updateHeight();
    });

    observer.observe(innerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(innerRef.current);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [isExpanded]);

  return (
    <div className={`glass-card-dark rounded-3xl p-6 md:p-8 hover:shadow-tech-lg transition-all duration-500 border border-cyan-500/30 shadow-tech card-hover code-border ${className}`}>
      <button 
        onClick={onToggle} 
        className="w-full flex items-center justify-between mb-4 group focus-visible-ring"
        aria-expanded={isExpanded}
        aria-controls="collapsible-content"
        type="button"
      >
        {header}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 group-hover:bg-cyan-500/30 group-hover:scale-105 transition-all duration-300 border border-cyan-500/30">
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
      <div
        id="collapsible-content"
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isExpanded ? height : '0px',
        }}
      >
        <div ref={innerRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

