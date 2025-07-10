"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Zap,
  Brain,
  CheckCircle,
  Star,
  Globe,
  Users,
  Sparkles,
} from "lucide-react"

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void
  onBackToLanding: () => void
}

export function SignInPage({ onSignIn, onBackToLanding }: SignInPageProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { signIn, signUp, signInWithProvider } = useAuth()
  const { toast } = useToast()

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          toast({
            title: "Full name required",
            description: "Please enter your full name to create an account.",
            variant: "destructive",
          })
          return
        }
        await signUp(email, password, fullName)
        toast({
          title: "Account created successfully!",
          description: "Welcome to Anchorly.ai. Your workspace is being prepared.",
        })
        onSignIn(email, password)
      } else {
        await signIn(email, password)
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your workspace.",
        })
        onSignIn(email, password)
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      toast({
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: "google" | "github" | "apple") => {
    setSocialLoading(provider)
    try {
      await signInWithProvider(provider)
      toast({
        title: "Redirecting...",
        description: `Signing in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
      })
    } catch (error: any) {
      console.error("Social sign in error:", error)
      toast({
        title: "Sign in failed",
        description: error.message || `Failed to sign in with ${provider}. Please try again.`,
        variant: "destructive",
      })
      setSocialLoading(null)
    }
  }

  const handleDemoSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("demo@anchorly.ai", "demo123456")
      toast({
        title: "Demo account loaded!",
        description: "Exploring Anchorly.ai with sample data.",
      })
      onSignIn("demo@anchorly.ai", "demo123456")
    } catch (error: any) {
      console.error("Demo sign in error:", error)
      toast({
        title: "Demo unavailable",
        description: "The demo account is temporarily unavailable. Please try creating an account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Neural network pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </radialGradient>
            </defs>
            {/* Animated nodes */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 1000}
                cy={Math.random() * 1000}
                r="2"
                fill="url(#nodeGradient)"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3">
              <img src="/images/white-anchor.png" alt="Anchor" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-semibold">Anchorly.ai</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl xl:text-6xl font-light leading-tight">
                Your Cognitive
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Command Center
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Harness AI-powered focus enhancement, real-time cognitive analytics, and personalized productivity
                optimization.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: Brain, text: "AI-Powered Focus Enhancement" },
                { icon: Zap, text: "Real-time Cognitive Analytics" },
                { icon: Shield, text: "Enterprise-Grade Security" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-teal-500/20 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <Badge className="bg-green-600/20 text-green-400 border-green-400/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                SOC 2 Certified
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/30">
                <Shield className="w-3 h-3 mr-1" />
                GDPR Compliant
              </Badge>
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-400/30">
                <Star className="w-3 h-3 mr-1" />
                99.9% Uptime
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Back button */}
            <Button variant="ghost" onClick={onBackToLanding} className="text-gray-400 hover:text-white p-0 h-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Button>

            {/* Auth Card */}
            <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-white">
                  {isSignUp ? "Create your workspace" : "Welcome back"}
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  {isSignUp
                    ? "Join thousands of professionals optimizing their cognitive performance"
                    : "Sign in to access your personalized focus dashboard"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Demo Account */}
                <Button
                  onClick={handleDemoSignIn}
                  disabled={isLoading || socialLoading !== null}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Try Demo Account
                </Button>

                <div className="relative">
                  <Separator className="bg-gray-700" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-3 text-sm text-gray-400">
                    or continue with
                  </span>
                </div>

                {/* Social Sign In */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={isLoading || socialLoading !== null}
                    className="h-12 bg-transparent border-gray-600 hover:bg-white/10"
                  >
                    {socialLoading === "google" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignIn("apple")}
                    disabled={isLoading || socialLoading !== null}
                    className="h-12 bg-transparent border-gray-600 hover:bg-white/10"
                  >
                    {socialLoading === "apple" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignIn("github")}
                    disabled={isLoading || socialLoading !== null}
                    className="h-12 bg-transparent border-gray-600 hover:bg-white/10"
                  >
                    {socialLoading === "github" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <Separator className="bg-gray-700" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-3 text-sm text-gray-400">
                    or use email
                  </span>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {isSignUp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="fullName" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                          placeholder="Enter your full name"
                          required={isSignUp}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 pl-10"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 pl-10 pr-10"
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white h-8 w-8 p-0"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || socialLoading !== null}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white font-medium"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </form>

                {/* Toggle Sign Up/Sign In */}
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-gray-400 hover:text-white p-0 h-auto"
                  >
                    {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise badges */}
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>Global CDN</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>10M+ Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Bank-level Security</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
