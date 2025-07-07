import React, { useState } from "react";
import Form from "./components/Form";
import LogoButton from "../components/LogoButton";
import { forgotPasswordService } from "@services/auth/user-auth.api";
import { customToast } from "@utils/toast";
import type { ForgotPasswordFormData, forgotPasswordPayload } from "@t/auth/auth.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@schemas/auth.schema";
import EmailSentDialog from "./components/EmailSentDialog";
import { AnimatePresence, motion } from "framer-motion";

function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [lastEmail, setLastEmail] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data: forgotPasswordPayload) => {
    setIsLoading(true);
    try {
      await forgotPasswordService(data);
      setEmailSent(true);
      setLastEmail(data.email);
      customToast("success", "Password reset link sent to your email.");
    } catch (err: any) {
      customToast("error", err.message || "Failed to send reset link.");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <LogoButton />
        <div className="bg-white shadow-md rounded-xl p-8 mt-2 relative overflow-hidden">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <AnimatePresence mode="wait">
            {!emailSent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
              >
                <Form
                  onSubmit={handleForgotPassword}
                  isLoading={isLoading}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              </motion.div>
            ) : (
              <motion.div
                key="dialog"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
              >
                <EmailSentDialog lastEmail={lastEmail!} setEmailSent={setEmailSent} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
