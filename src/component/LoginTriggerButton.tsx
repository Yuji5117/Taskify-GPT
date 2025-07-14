"use client";

import React, { useState } from "react";
import LoginModal from "./auth/LoginModal";

const LoginTriggerButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white px-3 py-1 bg-blue-600 hover:bg-blue-700 border font-semibold rounded-full shadow-md cursor-pointer"
      >
        Log in
      </button>
      {isModalOpen && (
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default LoginTriggerButton;
