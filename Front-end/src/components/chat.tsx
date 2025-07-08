import { useRef } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./message";
import Controls from "./controls";
import StartCall from "./startCall";
import EmotionProcessor from "./emotionProcessor";
import type { ComponentRef } from "react";

export default function ChatInterface() {
  const apiKey = import.meta.env.VITE_HUME_API_KEY;
  if (!apiKey) {
    return <div>Error: VITE_HUME_API_KEY environment variable is required</div>;
  }
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  return (
    <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-screen">
      <VoiceProvider
        auth={{ type: "apiKey", value: apiKey }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} />
        <EmotionProcessor />
        <Controls
          transcript="hello"
          emotions={{ joy: 0.9 }}
          geminiReply="You sound great!"
        />

        <StartCall />
      </VoiceProvider>
    </div>
  );
}
