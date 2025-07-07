import React, { useState } from "react";
import { MoveRight } from "lucide-react";

interface GetStartedBtnProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "get-started" | "connect";
  className?: string;
  children?: React.ReactNode;
}

const GetStartedBtn: React.FC<GetStartedBtnProps> = ({
  onClick,
  disabled = false,
  variant = "get-started",
  className = "",
  children,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const text = variant === "connect" ? "Connect" : "Get Started";

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    
    setTimeout(() => {
      setIsClicked(false);
    }, 1200);
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`
          group relative overflow-hidden
          flex items-center justify-center
          px-6 py-3 rounded-full
          font-medium text-sm sm:text-base
          border border-white
          bg-black text-white
          transition-all duration-300 ease-in-out
          ${disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"}
          ${isClicked ? "cursor-wait" : ""}
        `}
      >
        {children ? (
          children
        ) : (
          <>
            <span
              className={`
                select-none
                transition-all duration-100 ease-in-out
                ${isClicked ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
              `}
            >
              {text}
            </span>
            
            <MoveRight
              size={20}
              className={`
                absolute
                transition-all duration-500 ease-in-out
                ${isClicked 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-8"
                }
              `}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default GetStartedBtn;