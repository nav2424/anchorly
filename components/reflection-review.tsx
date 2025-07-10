"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Brain, Target, Zap, Sparkles } from "lucide-react"
import { useState } from "react"

export function ReflectionReview({ onBack }: { onBack: () => void }) {
  const [tomorrowIntent, setTomorrowIntent] = useState("")

  const weeklyData = [
    { day: "Mon", mood: 7, focus: 85 },
    { day: "Tue", mood: 6, focus: 78 },
    { day: "Wed", mood: 8, focus: 92 },
    { day: "Thu", mood: 5, focus: 65 },
    { day: "Fri", mood: 9, focus: 88 },
    { day: "Sat", mood: 8, focus: 75 },
    { day: "Sun", mood: 7, focus: 82 },
  ]

  const insights = [
    "Your focus dipped around 3PM daily. Try stacking your breaks there.",
    "You performed best on days when you started with morning meditation.",
    "Social media checks correlated with 23% lower afternoon focus scores.",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Weekly Reflection</h1>
          <p className="text-gray-400 text-lg">Understanding your patterns to build better focus habits</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Trend Chart */}
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Mood & Focus Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Chart */}
                <div className="h-48 flex items-end gap-2">
                  {weeklyData.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex flex-col gap-1 w-full">
                        <div
                          className="bg-gradient-to-t from-purple-400 to-purple-300 rounded-t"
                          style={{ height: `${day.mood * 8}px` }}
                        />
                        <div
                          className="bg-gradient-to-t from-blue-400 to-blue-300 rounded-b"
                          style={{ height: `${day.focus * 1.5}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{day.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded" />
                    <span className="text-gray-300">Mood</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded" />
                    <span className="text-gray-300">Focus Score</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">18h 32m</div>
                    <div className="text-green-300">Total Focus Time</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">+23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold text-white">Most Distracting Time</div>
                  <div className="text-2xl font-bold text-red-300">3:00 - 4:00 PM</div>
                  <div className="text-sm text-red-200">Average 12 interruptions</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-white mb-1">5-Day Streak</div>
                <div className="text-purple-300 text-sm">Your brain is rebalancing</div>
                <div className="mt-3">
                  <Sparkles className="w-6 h-6 text-yellow-400 mx-auto animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tomorrow's Intent */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Set Intent for Tomorrow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="What's your main focus for tomorrow?"
              value={tomorrowIntent}
              onChange={(e) => setTomorrowIntent(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-lg py-3"
            />
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                Set Reminder
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Schedule Focus Block
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center">
          <Button
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
