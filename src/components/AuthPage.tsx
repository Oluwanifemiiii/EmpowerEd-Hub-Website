import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase, projectId, publicAnonKey } from '../utils/supabase';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources';

interface AuthPageProps {
  onLogin: (userData: any) => void;
  onNavigate: (page: Page) => void;
}

export default function AuthPage({ onLogin, onNavigate }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    interests: [] as string[]
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (session?.access_token) {
        // Fetch user profile
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/profile/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const { profile } = await response.json();
          onLogin({
            ...profile,
            accessToken: session.access_token
          });
        } else {
          onLogin({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || 'Student',
            accessToken: session.access_token
          });
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (parseInt(signUpData.age) < 10 || parseInt(signUpData.age) > 15) {
      setError('Age must be between 10 and 15 years');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password,
          name: signUpData.name,
          age: parseInt(signUpData.age),
          interests: signUpData.interests
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Sign up failed');
        return;
      }

      // Now sign in the user
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email: signUpData.email,
        password: signUpData.password
      });

      if (signInError) {
        setError('Account created but sign in failed. Please try signing in manually.');
        return;
      }

      if (session?.access_token) {
        // Fetch the profile we just created
        const profileResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/profile/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        });

        if (profileResponse.ok) {
          const { profile } = await profileResponse.json();
          onLogin({
            ...profile,
            accessToken: session.access_token
          });
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-primary">EmpowerEd Hub</span>
          </button>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Sign in to continue your learning journey.
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                        disabled={loading}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-sm">
                    Forgot your password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join EmpowerEd Hub and start your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-age">Age</Label>
                    <Input
                      id="signup-age"
                      type="number"
                      placeholder="Enter your age (10-15)"
                      min="10"
                      max="15"
                      value={signUpData.age}
                      onChange={(e) => setSignUpData({...signUpData, age: e.target.value})}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                      disabled={loading}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  By creating an account, you agree to our terms of service and privacy policy.
                  We're committed to keeping your information safe.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <button 
            onClick={() => onNavigate('landing')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}