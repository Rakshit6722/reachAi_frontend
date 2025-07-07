import { Button } from '@components/components/ui/button'
import { Input } from '@components/components/ui/input'
import { Label } from '@radix-ui/react-label'
import type { ResetPasswordFormData, resetPasswordPayload } from '@t/auth/auth.types'
import { Eye, EyeOff } from 'lucide-react'
import React from 'react'
import type { FieldErrors, useForm, UseFormHandleSubmit } from 'react-hook-form'

type ResetPasswordFormProps = {
    handleSubmit: UseFormHandleSubmit<resetPasswordPayload> | any;
    onSubmit: (data: ResetPasswordFormData) => void;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    register: ReturnType<typeof useForm>["register"] | any;
    errors: FieldErrors<resetPasswordPayload> | any;
    showConfirm: boolean;
    setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
}

function Form({ handleSubmit, onSubmit, showPassword, setShowPassword, register, errors, showConfirm, setShowConfirm, isLoading }: ResetPasswordFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                    New Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        {...register("password")}
                        className="h-10 pr-10"
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
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                </Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        {...register("confirmPassword")}
                        className="h-10 pr-10"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        onClick={() => setShowConfirm((v) => !v)}
                    >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
        </form>
    )
}

export default Form
