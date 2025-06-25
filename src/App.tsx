import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./pages";
import Playground from "./pages/playground";

export default function App() {
  return (
    <Router>
        <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#efb1ae] via-[#FED5C7] to-[#FFE4C6] overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/playground" element={<Playground/>}/>
        </Routes>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FFE4C6] to-transparent pointer-events-none z-20" />
      </div>
    </Router>
  );
}
