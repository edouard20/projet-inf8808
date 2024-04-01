import "./App.css";
import { motion } from "framer-motion";

function ImageAnimation({img, delay, duration}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: delay,
        delay: duration,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
    <img src={img} className="img"></img> </motion.div>
  );
}

export default ImageAnimation;