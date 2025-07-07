import { useEffect, useState, useRef } from "react";

async function sendToGemini(transcript: string, emoData: any) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, emoData }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Gemini API error");
  }
  return res.json();
}

export default function ChatInterface() {
  const [message, setMessage] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hi there",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollBelow = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBelow();
  }, [message]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendToGemini(input, {});
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || data.message || "(No response)",
        timestamp: new Date(),
      };

      setMessage((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setMessage((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "ai",
          content: err.message || "Error contacting Gemini API",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white font-sans relative overflow-hidden">
      <div className="sticky top-0 z-10 border-white/20 px-8 shadow-sm text-center bg-neutral-900 ">
        <h1 className="text-3xl font-light text-neutral-400 mb-2 pt-6">Conversational Agent</h1>
        
      </div>

      <div className="flex-1 overflow-y-auto max-w-3xl w-full mx-auto px-8 py-12 pb-32 no-scrollbar">
        {message.map((msg) => (
          <div key={msg.id} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col items-start max-w-[75%]">
              <div className={`p-3 rounded-xl ${msg.type === "ai" ? "bg-neutral-700/80 text-white" : "bg-neutral-600 text-white"}`}>
                <p className="text-[16px] leading-relaxed font-light">{msg.content}</p>
              </div>
              <div className={`text-xs font-mono text-neutral-400 mt-1 ${msg.type === 'user' ? 'text-right self-end' : ''}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* input */}
      <div className="fixed bottom-4 left-0 right-0 px-4 ">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center overflow-hidden rounded-2xl backdrop-blur-3xl border border-white/20 bg-transparent shadow-xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type something..."
              className="flex-1 backdrop-blur-xl  text-white placeholder:text-gray-400 px-4 py-4 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="backdrop-blur-xl disabled:opacity-30 px-5 py-5 text-white hover:bg-white/20 transition-all disabled:cursor-not-allowed"
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
  );
}
