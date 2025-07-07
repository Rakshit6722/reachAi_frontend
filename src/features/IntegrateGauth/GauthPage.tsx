import React from "react";
import { Button } from "@components/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import { googleLogin } from "@utils/googleLogin";
import { motion } from "framer-motion";
import LogoButton from "../auth/components/LogoButton";

function GauthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 relative overflow-hidden">
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.22, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.16, 0.21, 0.16] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/90 shadow-xl rounded-2xl p-10 flex flex-col items-center border border-gray-100">
          <div className="flex flex-row-reverse items-center gap-4 mb-6">
            <LogoButton />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-blue-400"
            >
              <ArrowRight size={28} strokeWidth={2.2} />
            </motion.div>
            <div className="bg-blue-100 rounded-full p-4 shadow-sm flex items-center justify-center">
              <FcGoogle size={40} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Integrate Google Account
          </h2>
          <p className="text-center text-gray-500 text-base max-w-xs mb-6">
            Connect your Google account to enable mail features and seamless integration inside the application.
          </p>
          <Button
            onClick={googleLogin}
            className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-md py-2.5 rounded-lg transition-all"
            size="lg"
          >
            <FcGoogle size={22} />
            Integrate with Google
          </Button>
          <div className="mt-6 text-xs text-gray-400 text-center">
            Your Google account is required only for mail features. We never store your emails or credentials.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default GauthPage;
