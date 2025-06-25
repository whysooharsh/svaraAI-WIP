import { useEffect, useState } from "react";
import hume from "../lib/humeClient";

export default function Playground() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const synthesizeSpeech = async () => {
    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await hume.tts.synthesizeJson({
        body: {
          utterances: [
            {
              text,
              ...(description ? { description } : {})
            }
          ],
          format: {
            type: "mp3"
          },
          numGenerations: 1
        }
      });

      const base64 = response.generations[0].audio;
      const url = `data:audio/mp3;base64,${base64}`;
      setAudioUrl(url);
    } catch (err) {
      console.error("TTS error:", err);
      alert("Could not generate voice. See console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioUrl && audioUrl.startsWith('blob:')) {
      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
    return undefined;
  }, [audioUrl]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 font-mono pt-24">
      <h1 className="text-3xl font-bold mb-4 text-center">TTS Playground</h1>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={4}
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Voice description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={synthesizeSpeech}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition-colors"
        disabled={!text || loading}
      >
        {loading ? "Generating..." : "Generate Voice"}
      </button>

      {audioUrl && (
        <div className="mt-6">
          <audio
            controls
            src={audioUrl}
            aria-label="Generated audio playback"
            controlsList="nodownload noplaybackrate"
          />
        </div>
      )}
    </div>
  );
}
