"use client";
import { useEffect } from "react";

const AlertDialog = ({ message, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-out">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all scale-100 sm:max-w-md sm:w-full">
        <div className="text-center">
          <p className="text-lg font-semibold text-white">{message}</p>
          <div className="mt-4">
            <button 
              onClick={onClose} 
              className="inline-flex justify-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition ease-in-out duration-150"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
