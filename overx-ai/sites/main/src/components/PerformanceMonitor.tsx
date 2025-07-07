import { useEffect, useState } from 'react';

interface PerformanceData {
  fps: number;
  renderTime: number;
}

export function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 60,
    renderTime: 0
  });
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setPerformanceData(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    // Toggle monitor with keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || !showMonitor) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm font-mono z-50 backdrop-blur-sm border border-white/10">
      <div className="mb-2">FPS: <span className={performanceData.fps < 30 ? 'text-red-500' : performanceData.fps < 50 ? 'text-yellow-500' : 'text-green-500'}>{performanceData.fps}</span></div>
      <div className="text-xs text-gray-400">Press Ctrl+Shift+P to toggle</div>
    </div>
  );
}