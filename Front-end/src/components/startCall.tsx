import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import CallButton from "../ui/button";


export default function StartCall() {
  const { status, connect } = useVoice();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (e) {
      console.error("Error connecting:", e);
    }
  };

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-background"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <CallButton
                className={"z-50 flex items-center gap-1.5 rounded-full"}
                onClick={handleConnect}
                variant="connect"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
