import { useState } from 'react';

export function useExpandable<T extends string | number>() {
  const [expanded, setExpanded] = useState<Set<T>>(new Set());

  const toggle = (key: T) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const isExpanded = (key: T) => expanded.has(key);

  return { isExpanded, toggle };
}

