import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Emotion = {
  emotion: string;
  score: number;
};

type Message = {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  emotions?: Emotion[];
};

async function sendToGemini(transcript: string, emoData: Record<string, number>) {
  const res = await fetch("http://localhost:5000/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, emoData }),
  });
  
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Gemini API error");
  }
  const data = await res.json();
  return data;
}

export default function ChatInterface() {
  const [message, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const scrollBelow = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBelow();
  }, [message]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
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
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: data.response || "(No response)",
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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#FCE8E2] to-[#FEF8F6] text-[#242021] font-sans relative overflow-hidden">
      <div className="sticky top-0 z-10 border-b border-[#f4d5c7] bg-[#FEF8F6]/90 px-8 text-center backdrop-blur-md shadow-sm">
        <div className="relative flex items-center justify-center py-6">
          <button
            onClick={handleBack}
            className="absolute left-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E39682]/20 hover:bg-[#E39682]/30 border border-[#E39682]/30 transition-all duration-200 group"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#E07155] group-hover:text-[#D65A3F] transition-colors"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-[#E07155] group-hover:text-[#D65A3F] font-medium text-sm transition-colors">
              Back
            </span>
          </button>
          
          <h1 className="text-3xl font-light text-[#242021]">
            Conversational Agent
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-w-3xl w-full mx-auto px-8 py-12 pb-32 no-scrollbar">
        {message.length === 0 && (
          <div className="text-center text-[#6E6059] text-sm italic mb-4">
            Start a conversation to get a response from the assistant.
          </div>
        )}
        {message.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col items-start max-w-[75%]">
              <div
                className={`p-3 rounded-xl border ${
                  msg.type === "ai"
                    ? "bg-white/90 border-[#E07155]/30 text-[#242021]"
                    : "bg-[#E39682]/20 text-[#242021]"
                }`}
              >
                <p className="text-[16px] leading-relaxed font-normal">
                  {msg.content}
                </p>
              </div>
              <div
                className={`text-xs font-mono text-[#6E6059] mt-1 ${
                  msg.type === "user" ? "text-right self-end" : ""
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="fixed bottom-4 left-0 right-0 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center overflow-hidden rounded-2xl backdrop-blur-xl border border-[#E39682]/30 bg-white/80 shadow-lg">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type something..."
              className="flex-1 bg-transparent text-[#242021] placeholder:text-[#6E6059] px-4 py-4 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-[#E07155] hover:bg-[#D65A3F] disabled:opacity-30 px-5 py-5 text-white transition-all disabled:cursor-not-allowed"
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