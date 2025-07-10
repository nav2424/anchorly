"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { SignInPage } from "@/components/sign-in-page"
import { MainDashboard } from "@/components/main-dashboard"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [currentView, setCurrentView] = useState<"landing" | "signin" | "dashboard">("landing")
  const { user, loading } = useAuth()

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      console.log("User authenticated, showing dashboard")
      setCurrentView("dashboard")
    } else if (!loading && !user && currentView === "dashboard") {
      console.log("User not authenticated, showing landing")
      setCurrentView("landing")
    }
  }, [user, loading, currentView])

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto" />
          <p className="text-white">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  const handleSignInClick = () => {
    console.log("Navigating to sign in page")
    setCurrentView("signin")
  }

  const handleSignIn = (email: string, password: string) => {
    console.log("Sign in successful, navigating to dashboard")
    setCurrentView("dashboard")
  }

  const handleBackToLanding = () => {
    console.log("Navigating back to landing page")
    setCurrentView("landing")
  }

  const handleSignOut = () => {
    console.log("Sign out, navigating to landing page")
    setCurrentView("landing")
  }

  // Render based on current view and auth state
  if (currentView === "signin") {
    return <SignInPage onSignIn={handleSignIn} onBackToLanding={handleBackToLanding} />
  }

  if (currentView === "dashboard" && user) {
    return <MainDashboard user={user} onSignOut={handleSignOut} />
  }

  return <LandingPage onSignInClick={handleSignInClick} />
}
