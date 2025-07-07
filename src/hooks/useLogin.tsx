import { useMutation } from "@tanstack/react-query";
import { loginService } from "@services/auth/user-auth.api";
import { customToast } from "@utils/toast";
import UseAuthStore from "@hooks/UseAuthStore";
import { useNavigate } from "react-router-dom";

export function useLogin(reset: () => void) {
    const navigate = useNavigate()
    const { setUser } = UseAuthStore();

    const mutation = useMutation({
        mutationFn: loginService,
        onSuccess: (data: any) => {
            setUser(data?.data?.user);
            customToast('success', 'Login Successful')
            navigate('/dashboard')

        },
        onError: (err: any) => {
            customToast('error', err.message || 'Login failed');
        },
        onSettled: () => {
            reset()
        }
    });

    return mutation;
}