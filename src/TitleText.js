import "./App.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function TitleText() {
  const text = "The Era of Dominance: Powerhouses of Formula 1".split(" ");
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  return (
    <div className="introduction-text" ref={ref}>
      {text.map((el, i) => (
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                duration: 0.25,
                delay: i / 8,
              },
            },
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </div>
  );
}

export default TitleText;
