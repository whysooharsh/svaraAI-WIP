
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const [scrolled, setscrolled] = useState(false);
  const toggleMenu = () => setisOpen(!isOpen);


  useEffect(() => {
    const handleScroll = () => {
      setscrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    useEffect(()=>{
    if(isOpen){
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.classList.remove("overflow-hidden");
    }
    return ()=>{
        document.body.classList.remove("overflow-hidden");
    };
  },[isOpen]);

  return (
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-100 ${scrolled ? "backdrop-blur-2xl bg-white/90 shadow-md" : "bg-transparent"}`}>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16 '>

            <div className='flex items-center space-x-2 '>
              <img className='max-h-6 max-w-10' src='https://logowik.com/content/uploads/images/hume-ai1720994953.logowik.com.webp' alt=' '>
              </img>
              <span className="text-base font-mono font-sm text-black">bruh.</span>
            </div>

            {/* Desktop Menu */}

            <div className='hidden md:flex items-center space-x-6 '>

              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-black transition-colors font-sans text-xs uppercase">
                  PRODUCTS
                  <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
              </div>

              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-black transition-colors font-sans text-xs uppercase">
                  DEVELOPERS
                  <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
              </div>

              <a href="#" className="text-gray-600 hover:text-black transition-colors font-sans text-xs  uppercase">
                PRICING
              </a>

              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-black transition-colors font-sans text-xs uppercase">
                  RESOURCES
                  <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
              </div>
            </div>

            {/* desktop btn bruuh  */}
            <Link to = "/playground">
            <div className="hidden md:flex items-center">
              <button className="bg-black text-white px-2 py-1 rounded-full font-sans text-xs uppercase hover:bg-gray-800 transition-colors">
                GO TO APP
              </button>
            </div>
            </Link>

            {/* mobile btn */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} aria-label="Toggle Menu">
                <Bars3Icon className='h-6 w-6 text-gray-800' />

              </button>
            </div>

          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden fixed inset-0 backdrop-blur-2xl bg-white/90 z-50 flex flex-col">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }} className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div className='flex items-center space-x-2'>
                    <img className='max-h-6 max-w-10' src='https://logowik.com/content/uploads/images/hume-ai1720994953.logowik.com.webp' alt=' '>
                    </img>
                    <span className="text-base font-mono font-sm text-black">bruh.</span>
                  </div>
                  <button onClick={toggleMenu} aria-label="Close Menu">
                    <XMarkIcon className="h-6 w-6 text-gray-800" />
                  </button>
                </motion.div>

                {/* Mobile links/menu items */}
                <div className='flex-1 px-6 py-8'>
                  <div className='space-y-6'>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }} className='flex items-center justify-between py-4 border-b border-gray-100'>
                      <span className='text-gray-800 font-mono text-sm uppercase tracking-wider'>PRODUCT</span>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }} className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-gray-800 font-mono text-sm uppercase tracking-wider">DEVELOPERS</span>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }} className="py-4 border-b border-gray-100">
                      <span className="text-gray-800 font-mono text-sm uppercase tracking-wider">PRICING</span>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }} className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-gray-800 font-mono text-sm uppercase tracking-wider">RESOURCES</span>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="p-6 border-t border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black text-white py-4 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    GO TO APP
                  </motion.button>
                </motion.div>


              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </nav>
  );
}
