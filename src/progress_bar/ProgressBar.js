import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

function ProgressBar() {
    const { scrollYProgress } = useScroll();
    const [fullWidth, setFullWidth] = useState(0);
  
    useEffect(() => {
      const calculatedFullWidth = document.body.clientWidth;
      setFullWidth(calculatedFullWidth);
    }, []);
  
    const width = useTransform(scrollYProgress, [0, 1], [0, fullWidth]);
  
    return (
      <motion.div
        className="progress-bar"
        style={{
          width: width,
          backgroundSize: `20px 20px`,
        }}
      />
    );
  }
  

export default ProgressBar;