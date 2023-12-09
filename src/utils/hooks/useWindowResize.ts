import { useState, useEffect } from 'react';

export const useWindowResize = () => {
  const isClient = typeof window === 'object'; // Check if window is defined

  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isClient) {
      return; // Exit early if running on the server
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]); // Ensure the effect runs only on the client

  return windowSize;
};
