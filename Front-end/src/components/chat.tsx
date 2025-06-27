import React, { useRef } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./message";
import Controls from "./controls";
import StartCall from "./startCall";
import type { ComponentRef } from "react";

interface ClientComponentProps {
  accessToken: string;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ accessToken }) => {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  return (
    <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
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
        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  );
};

export default ClientComponent;
