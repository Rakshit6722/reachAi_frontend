import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@components/components/ui/card";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { Button } from "@components/components/ui/button";
import { containerVariants, itemVariants } from "@animations/motionVariants";
import GoogleButton from "../components/GoogleButton";
import { registerContent } from "@constants/auth/register.constants";
import { registerSchema } from "@schemas/auth.schema";
import type { SignupServicePayload } from "@t/auth/auth.types";
import { useMutation } from "@tanstack/react-query";
import { signupService } from "@services/auth/user-auth.api";
import { customToast } from "@utils/toast";
import { Link, useNavigate } from "react-router-dom";
import LogoButton from "../components/LogoButton";


export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignupServicePayload>({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation({
        mutationFn: signupService,
        onSuccess: (data) => {
            console.log("data", data)
            customToast('success', "Signup Successful")
            navigate("/login")
        },
        onError: (err: any) => {
            console.log("err", err)
            customToast('error', err.message)
        },
        onSettled: () => {
            reset()
        }
    });

    const onSubmit = (data: SignupServicePayload) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <LogoButton/>
                <Card className="shadow-lg rounded-xl">
                    <CardHeader>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <CardTitle className="text-center text-2xl font-semibold">
                                {registerContent.title}
                            </CardTitle>
                            <CardDescription className="text-center">
                                {registerContent.subtitle}
                            </CardDescription>
                        </motion.div>
                    </CardHeader>
                    <CardContent>
                        <motion.form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="space-y-1" variants={itemVariants}>
                                <Label htmlFor="name">{registerContent.nameLabel}</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder={registerContent.namePlaceholder}
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </motion.div>

                            <motion.div className="space-y-1" variants={itemVariants}>
                                <Label htmlFor="email">{registerContent.emailLabel}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={registerContent.emailPlaceholder}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </motion.div>

                            <motion.div className="space-y-1" variants={itemVariants}>
                                <Label htmlFor="password">{registerContent.passwordLabel}</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={registerContent.passwordPlaceholder}
                                        {...register("password")}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                        onClick={() => setShowPassword((v) => !v)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="w-full"
                                >
                                    {registerContent.signUp}
                                </Button>
                            </motion.div>

                            <motion.div
                                className="relative text-center"
                                variants={itemVariants}
                            >
                                <span className="absolute left-0 top-1/2 w-full border-t border-gray-200"></span>
                                <span className="relative bg-white px-2 text-sm text-muted-foreground">
                                    {registerContent.dividerText}
                                </span>
                            </motion.div>

                            <motion.div
                                className="flex gap-4"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <GoogleButton />
                                </motion.div>
                            </motion.div>

                            <motion.p
                                className="text-center text-sm text-muted-foreground pt-2"
                                variants={itemVariants}
                            >
                                {registerContent.alreadyHaveAccount}{" "}
                                <Link
                                    to={'/auth/login'}
                                    className="text-blue-600 hover:underline"
                                >
                                    {registerContent.signIn}
                                </Link>
                            </motion.p>
                        </motion.form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
