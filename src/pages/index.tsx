import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const scroll = useRef(null);
  const { scrollYProgress } = useScroll({ target: scroll, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={scroll} className='relative z-10 pt-20 px-6 pb-16 max-w-4xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl md:text-6xl font-sm font-sans mb-4 mt-12'>
          The future of AI-powered
        </h1>
        <span className="block text-3xl md:text-5xl font-light text-gray-800 mb-6">
          emotional intelligence
        </span>
        <p className='text-sm text-gray-600 font-mono'>
          "Build empathetic AI that understands human emotions through voice, text, and facial expressions"
        </p>
      </div>

      <motion.div style={{ scale, y }} className='bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg'>
        <div className='relative w-full pb-[56%] h-0 overflow-hidden rounded-xl max-w-6xl'>
          <iframe className='absolute top-0 left-0 w-full h-full'
            src='https://www.youtube.com/embed/2K2R8dmFhZY?controls=0&modestbranding=1&rel=0&showinfo=0'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </motion.div>

      <div className="text-center mt-10 animate-bounce text-gray-600 font-mono">
        ↓ Scroll to explore
      </div>
    </div>
  );
}
