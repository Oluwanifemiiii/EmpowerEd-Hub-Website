import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ResourcesPage from './components/ResourcesPage';
import ContactPage from './components/ContactPage';
import Navbar from './components/Navbar';
import { supabase, projectId } from './utils/supabase';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          // Fetch user profile if session exists
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/profile/${session.user.id}`, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const { profile } = await response.json();
            setUser({
              ...profile,
              accessToken: session.access_token
            });
            setIsAuthenticated(true);
          } else {
            // Fallback user data from auth metadata
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.name || 'Student',
              accessToken: session.access_token
            });
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setCurrentPage('landing');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateTo = (page: Page) => {
    // Redirect to auth if trying to access protected pages without authentication
    if (!isAuthenticated && (page === 'dashboard' || page === 'resources')) {
      setCurrentPage('auth');
      return;
    }
    
    // Redirect to dashboard if trying to access auth when already authenticated
    if (isAuthenticated && page === 'auth') {
      setCurrentPage('dashboard');
      return;
    }
    
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard user={user} onNavigate={navigateTo} />;
      case 'resources':
        return <ResourcesPage onNavigate={navigateTo} user={user} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  // Show loading screen while checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading EmpowerEd Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={handleLogout}
        onNavigate={navigateTo}
        currentPage={currentPage}
      />
      {renderCurrentPage()}
    </div>
  );
}