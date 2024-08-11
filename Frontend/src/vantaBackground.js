import React, { useEffect, useRef } from 'react';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const VANTA = window.VANTA;
    let vantaEffect = VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff513f,
      backgroundColor: '#00071c',
      points: 11.00,
      maxDistance: 17.00,
      spacing: 17.00
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: '100dvw', height: '100dvh', position: 'fixed', zIndex: '-1' }} />;
};

export default VantaBackground;
