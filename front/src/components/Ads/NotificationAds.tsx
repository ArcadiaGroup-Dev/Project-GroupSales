import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Cierra la notificación después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md text-white w-70 ${
        type === 'success' ? 'bg-secondary' : 'bg-red-400'
      }`}
    >
      {message}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-1 text-white"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
