import { apiConnector } from "@services/api-client/api";
import type { forgotPasswordPayload, loginServicePayload, resetPasswordPayload, SignupServicePayload } from "@t/auth/auth.types";

export const loginService = async (payload: loginServicePayload) => {
    try {
        const response = await apiConnector(
            "/api/auth/login",
            "POST",
            payload,
            null,
            false
        );

        if (response?.status === 200) {
            return response?.data
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error(err?.response?.data?.message || "Unauthorized");
        }
        throw new Error(err?.message || "An unknown error occurred");
    }
}

export const signupService = async (payload: SignupServicePayload) => {
    try {
        const response = await apiConnector(
            "/api/auth/signup",
            "POST",
            payload,
            null,
            false
        );

        if (response?.status === 201) {
            return response
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error(err?.response?.data?.message || "Unauthorized");
        } else if (err?.response?.status === 409) {
            throw new Error(err?.response?.data?.message || "Email already registered");
        }
        throw new Error(err?.message || "An unknown error occurred");
    }
}
export const forgotPasswordService = async (payload: forgotPasswordPayload) => {
    try {
        const response = await apiConnector(
            "/api/auth/forgot-password",
            "POST",
            payload,
            null,
            false
        );

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (err: any) {
        if (err?.response?.status === 404) {
            throw new Error(err?.response?.data?.message || "Unauthorized");
        }
        throw new Error(err?.message || "An unknown error occurred");
    }
}
export const resetPasswordService = async (payload: resetPasswordPayload) => {
    try {
        const response = await apiConnector(
            "/api/auth/reset-password",
            "POST",
            payload,
            null,
            false
        );

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (err: any) {
        if (err?.response?.status === 400) {
            throw new Error(err?.response?.data?.message || "Unauthorized");
        }
        throw new Error(err?.message || "An unknown error occurred");
    }
}
export const logoutUserService = async () => {
    try {
        const response = await apiConnector(
            "/api/auth/logout",
            "GET",
            null,
            null,
            false
        );

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error(err?.response?.data?.message || "Unauthorized");
        }
        throw new Error(err?.message || "An unknown error occurred");
    }
}
export const getUserProfileService = async () => {
    try {
        const response = await apiConnector(
            "/api/auth/profile",
            "GET",
            null,
            null,
            false
        );

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error(err?.response?.data?.message || "Unauthorized");
        }
        throw new Error(err?.message || "An unknown error occurred");
    }
}


