import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'link' | 'button' | 'whatsapp' | 'input'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary
    const isTouch = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, input, select, textarea, [role="button"], .clickable, label');
      if (clickable) {
        setIsHovered(true);
        if (target.closest('a[href*="wa.me"], button:has(.lucide-phone), a:has(.lucide-phone)')) {
          setHoverType('whatsapp');
        } else if (target.closest('input, textarea, select')) {
          setHoverType('input');
        } else if (target.closest('button')) {
          setHoverType('button');
        } else {
          setHoverType('link');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth fluid trailing interpolation (lerp)
    const animateTrail = () => {
      // Lerp factor 0.18 gives a silky, ultra-responsive glide
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailPos({ x: currentX, y: currentY });

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // If touch device (phone / tablet), do not render cursor to keep 100% natural mobile touch
  if (isTouchDevice || !isVisible) return null;

  const getRingStyle = () => {
    if (hoverType === 'whatsapp') {
      return 'border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_20px_rgba(52,211,153,0.35)] scale-150';
    }
    if (hoverType === 'input') {
      return 'border-cyan-400/70 bg-cyan-400/5 scale-90 rounded-md';
    }
    if (isHovered) {
      return 'border-cyan-400/90 bg-cyan-400/15 shadow-[0_0_24px_rgba(6,182,212,0.4)] scale-140';
    }
    if (isClicking) {
      return 'border-cyan-300 bg-cyan-400/25 scale-75';
    }
    return 'border-cyan-400/40 bg-transparent scale-100';
  };

  const getDotStyle = () => {
    if (hoverType === 'whatsapp') return 'bg-emerald-400 shadow-[0_0_8px_#34d399]';
    if (isHovered) return 'bg-cyan-300 scale-75 shadow-[0_0_10px_#38bdf8]';
    if (isClicking) return 'bg-white scale-125';
    return 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]';
  };

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ${getDotStyle()}`}
        />
      </div>

      {/* Smooth Trailing Liquid Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0)`,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border border-dashed transition-all duration-300 ease-out backdrop-blur-[0.5px] ${getRingStyle()}`}
        />
      </div>
    </>
  );
};
