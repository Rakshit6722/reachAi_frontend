import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logo } from "@assets/images";
import { Button } from "@components/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@components/components/ui/navigation-menu";
import { cn } from "@components/lib/utils";
import { NAV_LINKS, RESOURCE_LINKS } from "@constants/header/header.constant.ts";
import { authStore } from "@store/auth-store/authStore";
import UserMenu from "./UserMenu";
import { routes } from "../../../router/routes";

function Header() {
    const location = useLocation();
    const user = authStore((s) => s.user);

    return (
        <header className="fixed top-2 left-1/2 z-50 -translate-x-1/2 w-[97vw] max-w-5xl rounded-xl bg-white/80 backdrop-blur-md shadow-md border border-gray-100 px-4 py-1 transition-all">
            <div className="flex h-12 items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="ReachAI Logo" className="h-7 w-7" />
                    <span className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors tracking-tight">
                        ReachAI
                    </span>
                </Link>

                {/* Main Navigation */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {NAV_LINKS.map((item) => (
                            <NavigationMenuItem key={item.to}>
                                <Link to={item.to}>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "text-base px-3 py-1 rounded transition-all",
                                            location.pathname === item.to
                                                ? "font-semibold text-primary bg-primary/10"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                        )}
                                    >
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-base px-3 py-1 rounded">
                                Resources
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[340px] gap-2 p-3 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                                    {RESOURCE_LINKS.map((res) => (
                                        <li key={res.href} className={res.highlight ? "row-span-3" : ""}>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className={cn(
                                                        "block select-none space-y-1 rounded p-2 leading-none no-underline outline-none transition-colors",
                                                        res.highlight
                                                            ? "flex h-full w-full flex-col justify-end bg-gradient-to-b from-muted/50 to-muted p-4 focus:shadow-md"
                                                            : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    )}
                                                    href={res.href}
                                                >
                                                    <div className={cn("text-sm font-semibold leading-none", res.highlight && "mb-2 mt-2 text-base")}>
                                                        {res.title}
                                                    </div>
                                                    <p className="text-xs leading-tight text-muted-foreground">
                                                        {res.description}
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center space-x-1">
                    {(!user && location.pathname === '/') ? (
                        <>
                            <Link to={routes.login}>
                                <Button variant="ghost" size="sm" className="text-sm px-3">
                                    Login
                                </Button>
                            </Link>
                            <Link to={routes.signup}>
                                <Button size="sm" className="text-sm px-3">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        user && <UserMenu />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
