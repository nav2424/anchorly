"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Pause, Play, SkipForward, Volume2 } from "lucide-react"

export function FlowMode({ onExit }: { onExit: () => void }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(true)
  const [sessionType, setSessionType] = useState("Focus")

  const taskName = "Math Study Session"
  const mantra = "You've got this. One thing at a time."

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Session complete
      setIsRunning(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Exit Button */}
      <Button
        onClick={onExit}
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 text-white/60 hover:text-white z-10"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-8 max-w-2xl">
          {/* Session Info */}
          <div className="space-y-4">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
              {sessionType} Session
            </Badge>
            <h1 className="text-2xl font-semibold text-white/90">{taskName}</h1>
          </div>

          {/* Timer */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              {/* Progress Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Timer Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light text-white mb-2 font-mono">{formatTime(timeLeft)}</div>
                  <div className="text-white/60 text-sm">{isRunning ? "Focus time" : "Paused"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mantra */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-white/80 text-lg italic font-light">{mantra}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={toggleTimer}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-16 h-16 rounded-full"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            <Button variant="ghost" className="text-white/60 hover:text-white">
              <SkipForward className="w-5 h-5 mr-2" />
              Skip
            </Button>

            <Button variant="ghost" className="text-white/60 hover:text-white">
              <Volume2 className="w-5 h-5 mr-2" />
              Sounds
            </Button>
          </div>

          {/* Session Details */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-white/60">Duration: 25 minutes</div>
                <div className="text-white/60">Distractions blocked: 3</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
