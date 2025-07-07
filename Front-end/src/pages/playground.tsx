import { useState } from "react";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/button";

export default function Playground() {
  const { status, connect } = useVoice();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await connect();
      console.log("Connected successfully");
    } catch (err) {
      console.error("Connection failed:", err);
      setError("Failed to connect. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white/70 min-h-screen">
      <AnimatePresence>
        {status.value !== "connected" && (
          <motion.div
            className="fixed inset-0 p-4 flex items-center justify-center bg-background"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              enter: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <div className="space-y-4 text-center">
                <Button
                  onClick={handleConnect}
                  variant="call"
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
