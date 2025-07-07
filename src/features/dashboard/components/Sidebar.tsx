import React from "react";
import { NavLink } from "react-router-dom";
import { SIDEBAR_LINKS } from "@constants/dashboard/sidebar.constant";
import { logo } from "@assets/images";
import { LogOut, Settings, ChevronLeft } from "lucide-react";
import { authStore } from "@store/auth-store/authStore";
import { Button } from "@components/components/ui/button";
import { useNavigate } from "react-router-dom";

const links = Object.values(SIDEBAR_LINKS);

function Sidebar({ collapsed, onCollapsedChange }: {
  collapsed: boolean,
  onCollapsedChange: (data: boolean) => void
}) {
  const navigate = useNavigate();
  const user = authStore((s) => s.user);
  const logout = authStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleToggle = () => onCollapsedChange(!collapsed);

  return (
    <aside
      className={`min-h-screen fixed left-0 top-0 bg-white/80 backdrop-blur-sm border-r border-gray-100 shadow-sm flex flex-col py-6 transition-all duration-300 ${
        collapsed ? "w-20 px-2" : "w-64 px-4"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <img src={logo} alt="ReachAI Logo" className="h-8 w-8" />
          {!collapsed && (
            <span className="ml-2 text-xl font-bold text-gray-900">ReachAI</span>
          )}
        </div>
        <button
          onClick={handleToggle}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
        >
          <ChevronLeft
            size={18}
            className={`transform transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <nav className="flex flex-col gap-1.5">
        {links.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              } ${collapsed ? "justify-center" : ""}`
            }
            end
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "text-blue-700" : "text-gray-500"}>
                  {item.icon}
                </span>
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      {/* User section */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        {!collapsed ? (
          <div className="flex items-center justify-between mb-3 px-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 truncate max-w-28">
                  {user?.name || user?.email || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate max-w-28">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
          </div>
        )}
        
        <div className={`flex ${collapsed ? "flex-col items-center" : ""} gap-2`}>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={`text-gray-600 hover:text-red-600 hover:bg-red-50 ${
              collapsed ? "w-10 h-10 justify-center p-0" : "w-full justify-start"
            }`}
          >
            <LogOut size={18} />
            {!collapsed && <span className="ml-2 text-xs">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;