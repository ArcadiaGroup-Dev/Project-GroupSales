"use client";
import React, { useState } from 'react';
import { INotificationProps } from '../../Interfaces/IUser';
import { CiUser } from "react-icons/ci";

export const NotifFormsUsers: React.FC<INotificationProps> = ({ message }) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div 
        role="alert" 
        className="fixed top-24 right-4 z-50 rounded-xl shadow-md shadow-gray-400 bg-tertiary text-white p-4"
      >
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2"> 
            <CiUser />
            <p className="mt-1 text-sm text-white">{message}</p>
          </div>

          <button 
            onClick={handleClose} 
            className="text-white transition hover:text-gray-600"
          >
            <span className="sr-only">Dismiss popup</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};
