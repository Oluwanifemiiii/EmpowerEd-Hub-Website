import React from 'react';
import { Button } from './ui/button';
import { User, LogOut } from 'lucide-react';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources' | 'contact';

interface NavbarProps {
  isAuthenticated: boolean;
  user: any;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export default function Navbar({ isAuthenticated, user, onLogout, onNavigate, currentPage }: NavbarProps) {
  if (currentPage === 'landing') {
    return null; // Hide navbar on landing page
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() =>
              onNavigate(isAuthenticated ? "dashboard" : "landing")
            }
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-9 w-9 flex items-center justify-center overflow-hidden">
              <img
                src="src/styles/newsmplogo.svg"
                alt="EmpowerEd Hub Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: "1", // tighten vertical spacing
                    marginTop: "1.7rem", // pushes the whole logo down
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Audiowide", cursive',
                      fontSize: "2rem",
                    }}
                  >
                    Empower
                    <span style={{ marginLeft: "0.25rem" }}>ED</span>
                  </span>
                  <span
                    style={{
                      fontFamily: '"Kaushan Script", cursive',
                      fontSize: "2rem",
                      color: "#facc15",
                      marginLeft: "4.8rem", // shifts “Hub” so it lines under “ED”
                    }}
                  >
                    Hub
                  </span>
                </div>
              </div>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => onNavigate("dashboard")}
                  className={`text-sm transition-colors hover:text-primary ${
                    currentPage === "dashboard"
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate("resources")}
                  className={`text-sm transition-colors hover:text-primary ${
                    currentPage === "resources"
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Resources
                </button>
              </>
            )}
            <button
              onClick={() => onNavigate("contact")}
              className={`text-sm transition-colors hover:text-primary ${
                currentPage === "contact"
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Contact
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {user?.name || "Student"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:ml-2 sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => onNavigate("auth")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}