'use client'
import { useState } from 'react';
import { X, Coffee } from 'lucide-react';

export const BuyMeCoffeeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-44 z-40 flex items-center justify-center w-12 h-12 bg-[#FFDD00] hover:bg-[#FFD000] text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDD00]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Buy me a coffee"
      >
        <Coffee className="w-6 h-6" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm bg-background rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-10 p-1 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#FFDD00] to-[#FFB800] p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">
                ☕ Enjoying CartoTV?
              </p>
              <p className="text-sm text-gray-800 mt-1">
                Buy us a coffee to support the project and keep the experience clean and ad-free.
              </p>
            </div>

            {/* BMC Embed */}
            <div className="p-4">
              <a
                href="https://www.buymeacoffee.com/bizboomsecrets"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-[#FFDD00] hover:bg-[#FFD000] text-gray-900 font-semibold rounded-lg text-center transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <Coffee className="w-6 h-6" />
                  Buy me a coffee
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
