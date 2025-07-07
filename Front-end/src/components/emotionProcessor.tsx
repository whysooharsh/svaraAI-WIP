import { useEffect, useRef, useState } from "react";
import { useVoice } from "@humeai/voice-react";
import * as R from "remeda";

async function sendToGemini(transcript: string, emoData: Record<string, number>) {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, emoData }),
    });
    return await res.json();
  } catch (e) {
    console.error("Error sending data to Gemini:", e);
  }
}

type VoiceMessage = ReturnType<typeof useVoice>["messages"][number];

type InferredUserMessage = Extract<VoiceMessage, { type: "user_message" }>;

function EmotionProcessor() {
  const { messages } = useVoice();
  const [isProcessing, setIsProcessing] = useState(false);
  const lastProcessedMessage = useRef<Date | null>(null);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage?.type === "assistant_message" &&
      !isProcessing &&
      (!lastProcessedMessage.current ||
        lastMessage.receivedAt > lastProcessedMessage.current)
    ) {
      const userMessages = messages.filter(
        (m): m is InferredUserMessage =>
          m.type === "user_message" &&  
          !!m.models.prosody?.scores &&
          typeof m.message.content === "string" &&
          (!lastProcessedMessage.current ||
            m.receivedAt > lastProcessedMessage.current)
      );

      if (userMessages.length > 0) {
        setIsProcessing(true);
        lastProcessedMessage.current = lastMessage.receivedAt;

        const transcript = userMessages
          .map((m) => m.message.content)
          .join(" ")
          .trim();

        const allScores = userMessages.flatMap(
          (m) => m.models.prosody?.scores ? [m.models.prosody.scores] : []
        );

        if (transcript && allScores.length > 0) {

          const allEmotionEntries = R.flatMap(allScores, (scores) =>
            R.entries(scores)
          );

          const emotionsGrouped = R.groupBy(
            allEmotionEntries,
            ([emotion]) => emotion
          );

          const emotionSummary = R.mapValues(emotionsGrouped, (entries) =>
            R.meanBy(entries, ([, score]) => score)
          );

          console.log("User Transcript:", transcript);
          console.log("Aggregated Emotions:", emotionSummary);
          sendToGemini(transcript, emotionSummary);
        }

        setIsProcessing(false);
      }
    }
  }, [messages, isProcessing]);

  return null;
}

export default EmotionProcessor;
