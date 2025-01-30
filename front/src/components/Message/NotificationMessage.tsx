'use client'
import React, { useEffect, useState } from 'react';

export default function NotificationMessage() {
    const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const notifications = [
      '¡Alguien ha comprado un producto!',
      '¡Tu solicitud fue aceptada!',
      '¡Tienes un nuevo mensaje!',
      '¡Tu contraseña ha sido cambiada!',
      '¡Alguien ha comentado en tu publicación!'
    ];

    // Simulamos las notificaciones llegando cada 5 segundos
    const interval = setInterval(() => {
      // Seleccionamos un mensaje aleatorio de la lista
      const randomMessage = notifications[Math.floor(Math.random() * notifications.length)];

      // Agregamos la notificación a la lista de mensajes
      setMessages((prevMessages) => [randomMessage, ...prevMessages]);

      // Limitar la cantidad de notificaciones a 5
      if (messages.length >= 5) {
        setMessages((prevMessages) => prevMessages.slice(0, 4));
      }
    }, 5000); // Se enviará una nueva notificación cada 5 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [messages]); // Dependencia en messages para gestionar el array de notificaciones

  return (
    <div className="mt-24 flex justify-center">
  <div className="w-full max-w-md"> {/* Contenedor para limitar el ancho máximo */}
    {messages.map((message, index) => (
      <div key={index} className="notification mb-2 p-3 bg-gray-100 border-l-4 border-blue-500 rounded-lg shadow-md">
        <p>{message}</p>
      </div>
    ))}
  </div>
</div>

  );
}
