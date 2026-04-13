import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(durationMs: number, onTimeout: () => void) {
  const [remaining, setRemaining] = useState(durationMs);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const start = useCallback(() => {
    setRemaining(durationMs);
    setIsRunning(true);
  }, [durationMs]);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    setRemaining(durationMs);
    setIsRunning(true);
  }, [durationMs]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 100) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          onTimeoutRef.current();
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const progress = remaining / durationMs;
  return { remaining, progress, isRunning, start, stop, reset };
}
