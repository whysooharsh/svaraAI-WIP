import React from "react";
import { Phone } from "lucide-react";

interface EndCallButtonProps {
  className?: string;
  onClick: () => void;
}

const EndCallButton: React.FC<EndCallButtonProps> = ({ className = "", onClick }) => (
  <button
    type="button"
    aria-label="End call"
    className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-1 font-semibold transition-colors ${className}`}
    onClick={onClick}
  >
    <Phone className="size-4 opacity-70 fill-current" strokeWidth={0} />
    <span>End Call</span>
  </button>
);
export default EndCallButton;
