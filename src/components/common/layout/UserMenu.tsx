import React from "react";
import { Button } from "@components/components/ui/button";
import { authStore } from "@store/auth-store/authStore";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
    const navigate = useNavigate()
    const user = authStore((s) => s.user);
    const logout = authStore((s) => s.logout);

    const handleLogout = () => {
        logout();
        localStorage.removeItem("gmailIntegrated")
        navigate("/");
    };
    return (
        <div className="flex items-center gap-3">
            <span className="font-medium text-base text-gray-700">
                {user?.name || user?.email || "User"}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}