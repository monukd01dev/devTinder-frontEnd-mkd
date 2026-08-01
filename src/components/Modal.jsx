import { useEffect } from "react";
import { createPortal } from "react-dom"; 
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
    
    useEffect(() => {
        if(!isOpen) return;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) =>{
            if (e.key === 'Escape'){
                onClose();
            }
        }

        document.addEventListener('keydown',handleKeyDown);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown',handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div 
            onClick={onClose} 
            // 🚨 Mobile pe padding thodi kam (p-4)
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] cursor-pointer backdrop-blur-sm p-4"
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                // 🚨 Mobile pe p-5, Desktop pe p-6
                className="relative bg-base-100 p-5 md:p-6 rounded-3xl shadow-2xl cursor-default max-w-md w-full border border-base-content/10"
            >
                {/* 🚨 Responsive Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full bg-base-200/50 hover:bg-base-300 text-base-content/60 hover:text-base-content transition-colors"
                >
                    <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
}