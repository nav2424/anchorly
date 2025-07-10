"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth, type AuthUser } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  BarChart3,
  Calendar,
  CheckCircle,
  Timer,
  Focus,
  Sparkles,
} from "lucide-react"

interface MainDashboardProps {
  user: AuthUser
  onSignOut: () => void
}

export function MainDashboard({ user, onSignOut }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { signOut } = useAuth()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed Out Successfully",
        description: "You have been signed out of your account.",
      })
      onSignOut()
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message || "An error occurred while signing out.",
        variant: "destructive",
      })
    }
  }

  const focusStats = [
    { label: "Today's Focus Time", value: "4h 32m", change: "+12%", icon: Timer },
    { label: "Flow Sessions", value: "8", change: "+25%", icon: Zap },
    { label: "Productivity Score", value: "94%", change: "+8%", icon: TrendingUp },
    { label: "Deep Work Streaks", value: "12", change: "+3%", icon: Target },
  ]

  const recentSessions = [
    { task: "Product Strategy Review", duration: "2h 15m", score: 96, time: "9:00 AM" },
    { task: "Code Review & Debugging", duration: "1h 45m", score: 88, time: "11:30 AM" },
    { task: "Design System Updates", duration: "3h 20m", score: 92, time: "2:00 PM" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/white-anchor.png" alt="Anchor" className="w-8 h-8 object-contain" />
              <span className="text-xl font-semibold">Anchorly.ai</span>
            </div>
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.profile?.avatar_url || ""} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {user.profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{user.profile?.full_name || "User"}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-gray-400 hover:text-white">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-gray-900/30 min-h-screen">
          <nav className="p-6 space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "focus", label: "Focus Sessions", icon: Focus },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "calendar", label: "Calendar", icon: Calendar },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-purple-600/20 text-purple-300 border border-purple-400/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <h1 className="text-3xl font-light">Welcome back, {user.profile?.full_name?.split(" ")[0] || "there"}</h1>
              <p className="text-gray-400">
                Ready to achieve peak focus? Your cognitive workspace is optimized and ready.
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                Start Focus Session
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 bg-transparent">
                <Brain className="w-4 h-4 mr-2" />
                AI Recommendations
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                Set Daily Goals
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {focusStats.map((stat, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-semibold text-white">{stat.value}</p>
                        <p className="text-green-400 text-sm">{stat.change}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Recent Sessions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Focus Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{session.task}</p>
                            <p className="text-gray-400 text-sm">
                              {session.time} • {session.duration}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-600/20 text-green-400 border-green-400/30">
                          {session.score}% Focus
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-r from-purple-900/20 to-teal-900/20 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Cognitive Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Peak Focus Window Detected</p>
                        <p className="text-gray-300 text-sm">
                          Your optimal focus time is between 9:00 AM - 11:30 AM. Consider scheduling deep work during
                          this window.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Cognitive Load Optimization</p>
                        <p className="text-gray-300 text-sm">
                          Break complex tasks into 45-minute segments for 23% better retention based on your patterns.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Environment Sync Recommendation</p>
                        <p className="text-gray-300 text-sm">
                          Your focus improves 18% with ambient background noise. Try the "Forest Sounds" anchor.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
