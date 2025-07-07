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

            <motion.div
              className="bg-gradient-to-br from-purple-300 to-purple-400 rounded-3xl p-8 h-80 flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-1 flex items-center justify-center">
                <h3 className="text-3xl font-light text-gray-800">Meet Svara</h3>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Svara is not just another assistant — it's an emotionally intelligent listener. It hears beyond words, into feeling.
                </h4>
                <p className="text-sm text-gray-600 font-mono">July 2025</p>
              </div>
            </motion.div>


            <motion.div
              className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 h-80 flex flex-col justify-between relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-6 right-6">
                <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 w-full max-w-sm">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                      <span className="text-xs font-mono text-gray-600">OUTPUT</span>
                    </div>
                    <p className="text-sm font-medium">Conversation with Svara</p>
                  </div>


                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  The future of TTS: Svara understands tone, silence, and subtext — not just speech.
                </h4>
                <p className="text-sm text-gray-600 font-mono">Coming Soon</p>
              </div>
            </motion.div>

            {/* Semantic Space Theory Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-300 via-purple-300 to-yellow-300 rounded-3xl p-8 h-80 flex flex-col justify-between relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-6 right-6">
                <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-800 hover:bg-white transition-colors">
                  VIEW ARTICLE
                  <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Emotionally-Aware Machines: Listening Beyond Language
                </h4>
                <p className="text-sm text-gray-600 font-mono">July 2025</p>

              </div>
            </motion.div>
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