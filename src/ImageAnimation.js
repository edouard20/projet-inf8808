import "./App.css";
import { motion } from "framer-motion";
import { useState } from "react";

function ImageAnimation({img, description, delay, duration, width, height}) {

    const [isFlipped, setIsFlipped] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFlip = () => {
        if(!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }
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
        <div onClick={handleFlip}>
            <motion.div
                initial={false}
                animate={{rotateY: isFlipped ? 0: 360}}
                transition={{duration: 1, animationDirection: "normal"}}
                onAnimationComplete={() => setIsAnimating(false)}>
                    {isFlipped ? <img src={img} className="img-3" style={{width: width, height: height}} alt="ferrari"></img> : description != null ? <div className="img-text" style={{width: width, height: height}}>{description}</div> : <img src={img} style={{width: width, height: height}} className="img-3" alt="ferrari"></img>}
            </motion.div>
        </div> 
    </motion.div>
  );
}

export default ImageAnimation;