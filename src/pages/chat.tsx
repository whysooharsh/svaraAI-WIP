
import { useEffect, useState, useRef } from "react";

export default function ChatInterface() {

  const [message, setMessage] = useState([
    {
      id: 1,
      type: 'ai',
      content: "hello, I'm bot",
      timeStamp: new Date()

    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollBelow = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }

  useEffect(() => {
    scrollBelow();
  }, [message]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timeStamp: new Date()
    };
    setMessage(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now(   ) + 1,
        type: 'ai',
        content: "",
        timeStamp: new Date()
      };

      setMessage(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };




  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // handleSend();
    }

  };  

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans relative overflow-hidden pt-4">



        {/* something */}


      <div className="sticky top-0 z-10 min-h-screen flex flex-col ">
        <div className="border-b border-white/20 px-8 shadow-md">
          <div className="items-center text-center">
            <h1 className="text-3xl font-light text-neutral-400 mb-2">AI Chat</h1>
            <p className="text-sm font-mono text-gray-600/80">Empathic conversational agent</p>
          </div>
        </div>

        {/* message */}
        <div className="max-w-3xl mx-auto w-full px-8 py-12 pb-32">
          {/* bot */}
          <div className="bg-neutral-800 p-3 rounded-xl max-w-[75%] w-fit mr-auto text-white">
            <div>
              <p>hey, I am AI </p>
            </div>
          </div>
          {/* nigga */}
          <div className="bg-neutral-500 p-3 rounded-xl max-w-[75%] w-fit ml-auto text-white">
            <div>
              <p>hi ai, i'm nigga</p>
            </div>
          </div>

          <div ref={messageEndRef} />
        </div>


        {/* input */}

        <div className="fixed bottom-8 left-0 right-0 px-4 ">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center overflow-hidden rounded-2xl backdrop-blur-xl border border-white/20 bg-transparent shadow-xl">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="  Type something..."
                className="flex-1 bg-transparent text-white placeholder:text-gray-400 px-4 py-4 focus:outline-none"
              />

              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-5 py-5 text-white hover:bg-white/20 transition-all disabled:cursor-not-allowed"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}
