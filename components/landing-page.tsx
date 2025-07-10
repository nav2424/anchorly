"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Sparkles,
} from "lucide-react"

interface LandingPageProps {
  onSignInClick: () => void
}

export function LandingPage({ onSignInClick }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Focus Enhancement",
      description: "Advanced algorithms analyze your cognitive patterns and optimize your focus sessions in real-time.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Real-time Performance Analytics",
      description: "Track your productivity metrics, focus scores, and cognitive performance with precision.",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Target,
      title: "Personalized Optimization",
      description: "Tailored recommendations based on your unique work patterns and cognitive preferences.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "Machine learning adapts to your progress, ensuring optimal performance enhancement over time.",
      color: "from-green-500 to-green-600",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at Meta",
      content: "Anchorly.ai transformed my productivity. I'm achieving 40% more deep work sessions.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer at Stripe",
      content: "The AI insights are incredible. It's like having a personal productivity coach.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      content: "Finally, a tool that understands cognitive science. My research output has doubled.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const stats = [
    { value: "10M+", label: "Active Users" },
    { value: "94%", label: "Productivity Increase" },
    { value: "2.5x", label: "Focus Improvement" },
    { value: "99.9%", label: "Uptime" },
  ]

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

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/images/white-anchor.png" alt="Anchor" className="w-8 h-8 object-contain" />
              <span className="text-xl font-semibold">Anchorly.ai</span>
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Beta
              </Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
            </nav>

            <Button
              onClick={onSignInClick}
              className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-light leading-tight">
                Unlock Your
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Cognitive Potential
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                AI-powered focus enhancement platform that adapts to your unique cognitive patterns, optimizing
                productivity and mental performance in real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={onSignInClick}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white px-8 py-4 text-lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light">
              Engineered for
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                {" "}
                Peak Performance
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced cognitive science meets cutting-edge AI to deliver unprecedented focus enhancement and
              productivity optimization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl h-full">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light">
              Trusted by
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                {" "}
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their productivity with Anchorly.ai
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-6">
                      <div className="flex justify-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl text-white leading-relaxed">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                          alt={testimonials[currentTestimonial].name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                          <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-purple-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-light">
              Ready to
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                {" "}
                Transform
              </span>
              <br />
              Your Productivity?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join the cognitive revolution. Start your journey to peak mental performance today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={onSignInClick}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white px-8 py-4 text-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 pt-8">
              <Badge className="bg-green-600/20 text-green-400 border-green-400/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Free 14-day trial
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/30">
                <Shield className="w-3 h-3 mr-1" />
                No credit card required
              </Badge>
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-400/30">
                <Globe className="w-3 h-3 mr-1" />
                Cancel anytime
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/images/white-anchor.png" alt="Anchor" className="w-6 h-6 object-contain" />
              <span className="text-lg font-semibold">Anchorly.ai</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-8">© 2024 Anchorly.ai. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
