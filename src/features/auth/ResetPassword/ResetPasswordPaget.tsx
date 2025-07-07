import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordService } from "@services/auth/user-auth.api";
import { customToast } from "@utils/toast";
import { resetPasswordSchema } from "@schemas/auth.schema";
import type { ResetPasswordFormData } from "@t/auth/auth.types";
import Form from "./components/Form";
import LogoButton from "../components/LogoButton";

function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            customToast("error", "Invalid or missing token.");
            return;
        }
        setIsLoading(true);
        try {
            await resetPasswordService({ token, password: data.password });
            customToast("success", "Password reset successfully. Please login.");
            navigate("/login");
        } catch (err: any) {
            customToast("error", err.message || "Failed to reset password.");
        } finally {
            setIsLoading(false);
            reset();
        }
    };

    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <LogoButton />
                <h2 className="text-2xl font-semibold text-center mb-2">
                    Reset Password
                </h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Enter your new password below.
                </p>
                <Form
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    showPassword={showPassword}
                    setShowConfirm={setShowConfirm}
                    setShowPassword={setShowPassword}
                    register={register}
                    errors={errors}
                    isLoading={isLoading}
                    showConfirm={showConfirm}
                />
            </div>
        </div>
    );
}

export default ResetPasswordPage;
