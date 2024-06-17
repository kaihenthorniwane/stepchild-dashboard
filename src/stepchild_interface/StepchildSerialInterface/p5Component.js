// React component

import React, { useRef, useEffect } from 'react';
import { createP5Instance } from './p5Wrapper.js';

const P5Component = () => {
  const p5ContainerRef = useRef(null);

  useEffect(() => {
    if (p5ContainerRef.current) {
      createP5Instance(p5ContainerRef.current);
    }
  }, []);

  return <div ref={p5ContainerRef} />;
};

export default P5Component;