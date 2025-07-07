import { useState, useEffect, useRef, useCallback } from 'react';

export function useThrottledState<T>(initialValue: T, delay: number) {
  const [state, setState] = useState(initialValue);
  const lastRan = useRef(Date.now());

  const throttledSetState = useCallback((value: T) => {
    if (Date.now() - lastRan.current >= delay) {
      setState(value);
      lastRan.current = Date.now();
    }
  }, [delay]);

  return [state, throttledSetState] as const;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}