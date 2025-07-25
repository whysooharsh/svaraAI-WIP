import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./pages";
import Playground from "./pages/playground";
import AiChat from "./pages/aichat";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/aichat";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {/* min-h-screen bg-[radial-gradient(circle_at_bottom_left,_#1e1e1e,_#000)] */}
      <div className="min-h-screen bg-gradient-to-b from-[#efb1ae] via-[#FED5C7] to-[#FFE4C6]  overflow-hidden">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/aichat" element={<AiChat />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
