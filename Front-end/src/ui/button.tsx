import React from 'react';
import { Phone, PhoneCall } from 'lucide-react';

interface CallButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'call' | 'connect';
    className?: string;
    children?: React.ReactNode;
}

const CallButton: React.FC<CallButtonProps> = ({
    onClick,
    disabled = false,
    variant = 'call',
    className = '',
    children
}) => {
    const Icon = variant === 'call' ? Phone : PhoneCall;
    const text = variant === 'call' ? 'Call' : 'Connect';

    return (
        <div className={`flex items-center justify-center bg-transparent ${className}`}>
            <button
                onClick={onClick}
                disabled={disabled}
                aria-label={children ? undefined : text}
                type="button"
                className={`
                    flex items-center gap-2
                    px-6 py-3 rounded-full
                    font-medium text-lg
                    bg-black text-white
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >                {children ? children : (<><Icon size={20} />
                <span className="select-none">{text}</span></>)}
            </button>
        </div>
    );
};

export default CallButton;
