import { routes } from "../../router/routes";
import { Mail } from "lucide-react";

export const SIDEBAR_LINKS = {
    CAMPAIGN: {
        name: "Campaign",
        link: `${routes.dashboard.root}/campaigns`,
        icon: <Mail size={20} /> 
    },

}