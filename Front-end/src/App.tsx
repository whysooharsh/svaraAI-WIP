import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./pages";
import Playground from "./pages/playground";
import ChatInterface from "./pages/aichat";
import { VoiceProvider } from "@humeai/voice-react";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/chat";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="min-h-screen bg-gradient-to-b from-[#efb1ae] via-[#FED5C7] to-[#FFE4C6] overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/aichat" element={<ChatInterface />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const apiKey = import.meta.env.VITE_HUME_API_KEY;
  return (
    <Router>
      <VoiceProvider auth={{ type: "apiKey", value: apiKey }}>
        <AppContent />
      </VoiceProvider>
    </Router>
  );
}
