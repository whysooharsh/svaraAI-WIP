import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import GetStartedBtn from "../ui/getStartedBtn";

export default function Hero() {
  const scroll = useRef(null);
  const { scrollYProgress } = useScroll({ target: scroll, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const navigate = useNavigate();

  return (
    <>
      <div ref={scroll} className='relative z-10 pt-20 px-6 pb-16 max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl md:text-6xl font-sm font-sans mb-4 mt-12'>
            The future of AI-powered
          </h1>
          <span className="block text-3xl md:text-5xl font-light text-gray-800 mb-6">
            emotional intelligence
          </span>
          <p className='text-sm text-gray-600 font-mono'>
            emotionally-aware machine that doesn't just talk, but listens.
            Svara understands tone, emotion, and silence.
          </p>
        </div>

        <motion.div style={{ scale, y }} className='bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg'>
          <div className='relative w-full pb-[56%] h-0 overflow-hidden rounded-xl max-w-6xl'>
            <iframe className='absolute top-0 left-0 w-full h-full'
              src='https://www.youtube.com/embed/2K2R8dmFhZY?controls=0&modestbranding=1&rel=0&showinfo=0'
              title="Product Demo Video"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>          </div>
        </motion.div>
      </div>


      <div className="-mt-20 bg-amber-100 w-full px-6 py-20">
        <div className="text-center mt-10 animate-bounce text-gray-600 font-mono">
          ↓ Scroll to explore
        </div>

        <div className="max-w-7xl mx-auto mt-20">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 max-w-4xl">
              We explore how emotion-aware AI can align with and enhance human well-being            </h2>
            <button className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-mono text-sm">
              LEARN MORE
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

           
 
        
          </div>
        </div>
        <div className="pt-10">

          <GetStartedBtn onClick={() => navigate("/playground")} />
        </div>
      </div>
      <div>
      </div>
      {/* footer */}

    </>
  );
}