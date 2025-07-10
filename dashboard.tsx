"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Play, Clock, Target, Zap, Smile, Meh, Frown, Calendar, Timer } from "lucide-react"

export default function FocusPilotDashboard() {
  const [moodValue, setMoodValue] = useState([7])
  const [moodNote, setMoodNote] = useState("")

  const focusScore = 87
  const trendUp = true
  const distractionTime = "1h 35m"

  const upcomingSessions = [
    { time: "2:00 PM", duration: "25 min", tag: "Study", color: "bg-blue-100 text-blue-700" },
    { time: "3:30 PM", duration: "45 min", tag: "Project", color: "bg-purple-100 text-purple-700" },
    { time: "5:00 PM", duration: "30 min", tag: "Reading", color: "bg-green-100 text-green-700" },
  ]

  const dopamineData = [
    { time: "9AM", level: 6, activity: "Morning coffee" },
    { time: "11AM", level: 4, activity: "Email check" },
    { time: "2PM", level: 9, activity: "YouTube spike" },
    { time: "4PM", level: 3, activity: "Focus session" },
    { time: "6PM", level: 7, activity: "Workout" },
  ]

  const getMoodEmoji = (value: number) => {
    if (value <= 3) return <Frown className="w-5 h-5 text-red-400" />
    if (value <= 6) return <Meh className="w-5 h-5 text-yellow-400" />
    return <Smile className="w-5 h-5 text-green-400" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Anchorly.ai
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">3-Day Focus Streak</p>
              <p className="font-semibold text-orange-600">🔥 Keep it up!</p>
            </div>
            <Avatar className="w-10 h-10 ring-2 ring-blue-100">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Focus Score Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg shadow-blue-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Focus Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-800">{focusScore}%</span>
                <div className="flex items-center gap-1 mb-2">
                  {trendUp ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}>
                    {trendUp ? "+5%" : "-3%"}
                  </span>
                </div>
              </div>
              <Progress value={focusScore} className="mt-3 h-2" />
              <p className="text-xs text-gray-500 mt-2">vs yesterday</p>
            </CardContent>
          </Card>

          {/* Distraction Time Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg shadow-red-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                Distraction Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-800">{distractionTime}</span>
              </div>
              <div className="mt-4 h-12 flex items-end gap-1">
                {[20, 35, 15, 45, 25, 30, 35].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-red-200 to-red-300 rounded-sm flex-1"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Today's pattern</p>
            </CardContent>
          </Card>

          {/* Mood Check-in */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg shadow-purple-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                {getMoodEmoji(moodValue[0])}
                Mood Check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Slider value={moodValue} onValueChange={setMoodValue} max={10} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>😢</span>
                  <span>😐</span>
                  <span>😊</span>
                </div>
              </div>
              <Input
                placeholder="How are you feeling?"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                className="border-0 bg-gray-50/50 placeholder:text-gray-400"
              />
            </CardContent>
          </Card>

          {/* Upcoming Focus Sessions */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg shadow-green-100/50 md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Upcoming Focus Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSessions.map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="font-medium text-gray-700">{session.time}</span>
                      <Badge className={`${session.color} border-0`}>{session.tag}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Timer className="w-4 h-4" />
                      <span className="text-sm">{session.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Dopamine Log */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg shadow-yellow-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Dopamine Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dopamineData.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-12">{item.time}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.level > 7 ? "bg-red-400" : item.level > 5 ? "bg-yellow-400" : "bg-green-400"
                          }`}
                          style={{ width: `${item.level * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 w-20 truncate">{item.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Start Focus Mode CTA */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold rounded-2xl shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 hover:scale-105"
          >
            <Play className="w-6 h-6 mr-3" />
            Start Focus Mode
          </Button>
        </div>
      </div>
    </div>
  )
}
