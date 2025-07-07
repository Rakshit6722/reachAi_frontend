import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { Button } from "@components/components/ui/button";
import { forgotPasswordSchema } from "@schemas/auth.schema";
import type { ForgotPasswordFormData, forgotPasswordPayload } from "@t/auth/auth.types";


function Form({ onSubmit, isLoading, handleSubmit, register, errors }: {
  onSubmit: (data: ForgotPasswordFormData) => void;
  isLoading?: boolean;
  handleSubmit: (func: (data: forgotPasswordPayload) => void) => any,
  register: any,
  errors: any
}) {

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className="h-10"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}

export default Form;
