import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  User,
  LogOut,
  FileText,
  Briefcase,
  Landmark,
  HeartPulse,
  Sun,
  Moon,
} from "lucide-react";
import { currentContext } from "@/context/Current";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useContext(currentContext);
  const firstLetter = user?.firstname?.charAt(0)?.toUpperCase();

  // 🌗 Theme State
  const [theme, setTheme] = useState(() => {
    // Load saved theme from localStorage
    return localStorage.getItem("theme") || "light";
  });

  // 🌓 Update HTML class and store theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 🔄 Toggle Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
        
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <Accessibility className="h-9 w-9 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              JOINT HANDS
            </span>
          </Link>

          {/* NAV BUTTONS */}
          <div className="flex items-center gap-5">
            {/* 🌙 LIGHT / DARK TOGGLE */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
            </button>

            {user ? (
              <>
                <Link to="/jobs">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-base font-semibold hover:text-primary transition-colors"
                  >
                    Find Jobs
                  </Button>
                </Link>

                <Link to="/training">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-base font-semibold hover:text-primary transition-colors"
                  >
                    Training
                  </Button>
                </Link>

                <Link to="/community">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-base font-semibold hover:text-primary transition-colors"
                  >
                    Community
                  </Button>
                </Link>

                <Link to="/courses">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-base font-semibold hover:text-primary transition-colors"
                  >
                    Explore Courses
                  </Button>
                </Link>

                {/* 🆕 First Aid Website Button */}
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
                >
                  <a
                    href="https://stunning-speculoos-18716f.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <HeartPulse className="w-5 h-5" />
                    First Aid Box
                  </a>
                </Button>

                {/* USER MENU */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-semibold text-lg hover:scale-105 transition-transform shadow-md"
                      aria-label="User Menu"
                    >
                      {firstLetter || <User className="w-5 h-5" />}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-52 rounded-xl shadow-lg border border-border/40 bg-card"
                  >
                    <DropdownMenuLabel className="text-lg font-semibold text-foreground">
                      👋 {user.firstname || "User"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <Link to="/profile">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-2">
                        <User className="w-4 h-4" /> Profile
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/resume">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-2">
                        <FileText className="w-4 h-4" /> Resume
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/interview">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-2">
                        <Briefcase className="w-4 h-4" /> Interview
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/govt-schemes">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-2">
                        <Landmark className="w-4 h-4 text-green-600" /> Govt Schemes (PwD)
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="flex items-center gap-2 text-destructive font-medium text-base cursor-pointer hover:bg-destructive/10 rounded-md px-2 py-2"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white text-base font-semibold px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
