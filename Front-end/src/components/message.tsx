"use client";
import { cn } from "../utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./expressions";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import type { ComponentRef } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  return (
    <motion.div
      layoutScroll
      className="grow overflow-auto p-6 pt-24"
      ref={ref}
    >
      <motion.div className="max-w-3xl mx-auto w-full flex flex-col gap-4 pb-24">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              const isUser = msg.type === "user_message";
              
              return (
                <motion.div
                  role="article"
                  aria-label={`${msg.message.role} message from ${msg.receivedAt.toLocaleTimeString()}`}
                  key={`${msg.type}-${index}-${msg.receivedAt.getTime()}`}
                  className={cn(
                    "w-[75%] max-w-lg",
                    "backdrop-blur-xl",
                    "border border-white/40",
                    "rounded-2xl",
                    "shadow-lg shadow-black/5",
                    "hover:shadow-xl hover:shadow-black/10",
                    "transition-all duration-300 ease-out",
                    "overflow-hidden",
                    isUser 
                      ? "ml-auto bg-white/60 hover:bg-white/70" 
                      : "mr-auto bg-white/40 hover:bg-white/50"
                  )}
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8,
                  }}
                >
               
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full shadow-sm",
                        isUser 
                          ? "bg-gradient-to-r from-rose-400 to-pink-400" 
                          : "bg-gradient-to-r from-amber-400 to-orange-400"
                      )} />
                      <span className="text-sm font-bold text-gray-700 capitalize tracking-wide">
                        {msg.message.role}
                      </span>
                    </div>
                    <time className="text-xs text-gray-500 font-medium bg-white/50 px-2 py-1 rounded-full">
                      {msg.receivedAt.toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                        second: undefined,
                      })}
                    </time>
                  </div>

                
                  <div className="px-4 pb-4">
                    <div className="text-sm leading-relaxed text-gray-800 font-medium">
                      {msg.message.content}
                    </div>
                  </div>

                  {/* Expressions */}
                  {msg.models.prosody?.scores && (
                    <div className="border-t border-white/30 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm">
                      <Expressions values={{ ...msg.models.prosody.scores }} />
                    </div>
                  )}
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;