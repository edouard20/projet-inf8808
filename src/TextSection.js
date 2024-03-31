import React from "react";
import { motion } from "framer-motion";
import './App.css';

function TextSection({ text }) {
  return (
    <motion.div
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
}

export default TextSection;
