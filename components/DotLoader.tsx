'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  // First useEffect: ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Run only once per session
    const hasVisited = sessionStorage.getItem('siteLoaded');

    if (hasVisited) return;

    setShow(true);
    document.body.style.overflow = 'hidden';

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 30;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          sessionStorage.setItem('siteLoaded', 'true');
          document.body.style.overflow = '';
          setShow(false);
          window.scrollTo(0, 0);
        }, 700);
      }

      setProgress(value);
    }, 400);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [mounted]);

  // Don't render anything until mounted on client
  if (!mounted || !show) return null;

  // Use portal to render outside the normal DOM hierarchy
  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#dacfbe] font-goudy transition-opacity duration-700 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="text-black text-lg tracking-widest">Loading</p>

        <div className="h-[2px] w-48 bg-black/20 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-black text-sm">{Math.floor(progress)}%</span>
      </div>
    </div>,
    document.body
  );
}
