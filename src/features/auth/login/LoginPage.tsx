import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
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
import type { LoginFormData } from "@t/auth/auth.types.ts";
import { loginSchema } from "@schemas/auth.schema";
import { loginContent } from "@constants/auth/login.constants";
import GoogleButton from "../components/GoogleButton";
import { useLogin } from "@hooks/useLogin";
import { Link } from "react-router-dom";
import LogoButton from "../components/LogoButton";
import { routes } from "../../../router/routes";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useLogin(reset);

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <LogoButton />

        <Card className="border-none shadow-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-medium text-center">
              {loginContent.title}
            </CardTitle>
            <CardDescription className="text-center">
              {loginContent.subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-normal">
                  {loginContent.emailLabel}
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder={loginContent.emailPlaceholder}
                  className="h-10"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-normal">
                    {loginContent.passwordLabel}
                  </Label>
                  <Link to={routes.forgotPassowrd} className="text-xs text-primary hover:underline">
                    {loginContent.forgotPassword}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={loginContent.passwordPlaceholder}
                    className="h-10 pr-10"
                    {...register("password")}
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
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full h-10 mt-2"
              >
                {mutation.isPending ? "Signing in..." : loginContent.signIn}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {loginContent.dividerText}
                  </span>
                </div>
              </div>

              <GoogleButton />

              <div className="text-center text-sm text-muted-foreground mt-6">
                {loginContent.noAccount}{" "}
                <Link to="/auth/signup" className="text-primary hover:underline font-medium">
                  {loginContent.signUp}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
