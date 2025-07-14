"use client";

import React, { useState } from "react";
import LoginModal from "./auth/LoginModal";
import Button from "./ui/Button";

const LoginTriggerButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button size="sm" onClick={() => setIsModalOpen(true)}>
        Log in
      </Button>
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
