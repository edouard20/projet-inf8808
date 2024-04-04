import React from "react";
import { motion } from "framer-motion";
import './App.css';

const TextSection = React.forwardRef(({ text }, ref) => {
  return (
    <motion.div
      ref={ref} 
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
        transition: {
          duration: 3
        }
      }}
      viewport={{ once: true }}
    >
      <p className="card-text">{text}</p>
    </motion.div>
  );
});

export default TextSection;
