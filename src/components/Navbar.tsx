import React from 'react';
import { Button } from './ui/button';
import { BookOpen, User, LogOut } from 'lucide-react';

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
            onClick={() => onNavigate(isAuthenticated ? "dashboard" : "landing")} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-primary">EmpowerEd Hub</span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className={`text-sm transition-colors hover:text-primary ${
                    currentPage === 'dashboard' 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('resources')}
                  className={`text-sm transition-colors hover:text-primary ${
                    currentPage === 'resources' 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground'
                  }`}
                >
                  Resources
                </button>
              </>
            )}
            <button 
              onClick={() => onNavigate('contact')}
              className={`text-sm transition-colors hover:text-primary ${
                currentPage === 'contact' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground'
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
                    {user?.name || 'Student'}
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
              <Button size="sm" onClick={() => onNavigate('auth')}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}