import { useEffect, useRef, useState } from "react";
import { useVoice } from "@humeai/voice-react";

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

async function saveConversation(messages: any[]) {
  try {
    const res = await fetch("http://localhost:5000/api/save-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    console.log("Saved conversation:", data);

    const geminiRes = await fetch("http://localhost:5000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const geminiData = await geminiRes.json();
    if (geminiData.response) {
      console.log("Gemini's analysis:", geminiData.response);
      return geminiData.response;
    }
  } catch (err) {
    console.error("Error in conversation processing:", err);
  }
}

function EmotionProcessor() {
  const { messages } = useVoice();
  const lastSavedMessageId = useRef<string | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const debouncedSave = useRef(
    debounce(async (msgs: any[]) => {
      const response = await saveConversation(msgs);
      if (response) setGeminiResponse(response);
    }, 2000)
  ).current;

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const messageId = lastMessage?.type === 'user_message' || lastMessage?.type === 'assistant_message'
        ? `${lastMessage.receivedAt}-${lastMessage.message?.content}`
        : null;

      if (messageId && messageId !== lastSavedMessageId.current) {
        lastSavedMessageId.current = messageId;
        debouncedSave(messages);
      }
    }
  }, [messages, debouncedSave]);

  if (geminiResponse) {
    return <div className="gemini-response">{geminiResponse}</div>;
  }

  return null;
}

export default EmotionProcessor;
