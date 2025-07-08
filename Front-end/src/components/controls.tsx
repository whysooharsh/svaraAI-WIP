import React from "react";
import { useVoice } from "@humeai/voice-react";
import EndCallButton from "../ui/endCallButton";
import { Mic, MicOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "../ui/toggle";
import MicFFT from "./micFFT";
import { cn } from "../utils"; 
import { useNavigate } from "react-router-dom";

interface ControlsProps {
  transcript: string;
  emotions: Record<string, number>;
  geminiReply: string;
}

const Controls: React.FC<ControlsProps> = ({ transcript, emotions, geminiReply }) => {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const navigate = useNavigate();

  const handleEndCall = async () => {
    try {
      console.log("📤 Saving to server...");
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL || "http://localhost:5000"}/api/save-entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript,
          emotions,
          geminiReply,
        }),
      });

      const data = await res.json();
      console.log("✅ Save response:", data);
    } catch (err) {
      console.error("❌ Error saving entry:", err);
    } finally {
      disconnect();
      navigate("/playground");
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 pb-6 flex items-center justify-center",
        "bg-gradient-to-t from-card via-card/90 to-card/0"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="p-4 bg-card border border-border/50 rounded-full flex items-center gap-4"
          >
            <Toggle
              className="rounded-full"
              pressed={!isMuted}
              onPressedChange={() => {
                isMuted ? unmute() : mute();
              }}
            >
              {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            </Toggle>

            <div className="relative grid h-8 w-48 shrink-0 grow-0">              
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <EndCallButton
              className="flex items-center gap-1 rounded-full"
              onClick={handleEndCall}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Controls;
