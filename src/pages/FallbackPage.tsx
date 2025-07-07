import React from 'react';
import { Button } from "@components/components/ui/button";
import { useNavigate } from "react-router-dom";
import LogoButton from "../features/auth/components/LogoButton";

type statusNumber = 404;

function FallbackPage({ status }: { status: statusNumber }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <LogoButton />
      <div className="bg-white shadow-lg rounded-xl p-10 flex flex-col items-center mt-4">
        <div className="text-6xl font-bold text-blue-500 mb-2">{status}</div>
        <div className="text-2xl font-semibold mb-2">Page Not Found</div>
        <div className="text-gray-500 mb-6 text-center max-w-xs">
          Sorry, the page you are looking for does not exist or has been moved.
        </div>
        <Button onClick={() => navigate("/")} className="w-full">
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default FallbackPage;
