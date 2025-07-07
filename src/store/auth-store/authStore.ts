import { logoutUserService } from '@services/auth/user-auth.api';
import type { AuthState } from '@t/auth/auth.types';
import { customToast } from '@utils/toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export const authStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: async () => {
                try {
                    const response = await logoutUserService()
                    if (!response?.data?.success) {
                        throw new Error("Logout failed")
                    }
                    set({ user: null })
                    localStorage.removeItem("gmailIntegrated")
                    customToast("success", "See you again:)")
                } catch (err: any) {
                    customToast("error", err?.message)
                }

            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
)