"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Zap, Smartphone, ArrowRight, CheckCircle } from "lucide-react"

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState("")
  const [energyMap, setEnergyMap] = useState({ peak: "", low: "" })
  const [focusProfile, setFocusProfile] = useState({ afternoon: "", temptation: "" })

  const steps = ["Welcome", "Goals", "Energy", "Profile", "Complete"]

  const goals = [
    {
      id: "procrastination",
      title: "Beat Procrastination",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-400 to-pink-400",
    },
    {
      id: "screen",
      title: "Reduce Screen Addiction",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "study",
      title: "Study with Flow",
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-400",
    },
    {
      id: "energy",
      title: "Balance Energy",
      icon: <Zap className="w-6 h-6" />,
      color: "from-green-400 to-emerald-400",
    },
  ]

  const timeBlocks = [
    { time: "6-9 AM", label: "Early Morning" },
    { time: "9-12 PM", label: "Morning" },
    { time: "12-3 PM", label: "Afternoon" },
    { time: "3-6 PM", label: "Late Afternoon" },
    { time: "6-9 PM", label: "Evening" },
    { time: "9-12 AM", label: "Night" },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl mx-auto flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Hey, we're glad you're here</h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Let's take a few minutes to personalize FocusPilot for your unique mind and goals.
              </p>
            </div>
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Let's find your flow
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">What's your main focus goal?</h2>
              <p className="text-gray-400">Choose what resonates most with you right now</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    selectedGoal === goal.id
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-xl mx-auto flex items-center justify-center`}
                    >
                      {goal.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={nextStep}
                disabled={!selectedGoal}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">When is your brain at its best?</h2>
              <p className="text-gray-400">Help us understand your natural energy rhythms</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">When do you feel most alert?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeBlocks.map((block) => (
                    <Button
                      key={block.time}
                      variant={energyMap.peak === block.time ? "default" : "outline"}
                      onClick={() => setEnergyMap({ ...energyMap, peak: block.time })}
                      className={`p-4 ${energyMap.peak === block.time ? "bg-green-500 hover:bg-green-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{block.time}</div>
                        <div className="text-xs opacity-75">{block.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">When do you feel most distracted?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeBlocks.map((block) => (
                    <Button
                      key={block.time}
                      variant={energyMap.low === block.time ? "default" : "outline"}
                      onClick={() => setEnergyMap({ ...energyMap, low: block.time })}
                      className={`p-4 ${energyMap.low === block.time ? "bg-red-500 hover:bg-red-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{block.time}</div>
                        <div className="text-xs opacity-75">{block.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={nextStep}
                disabled={!energyMap.peak || !energyMap.low}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">Let's understand your focus patterns</h2>
              <p className="text-gray-400">A couple quick questions to personalize your experience</p>
            </div>

            <div className="space-y-8">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">How do you usually feel mid-afternoon?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Energized and focused",
                      "Slightly tired but manageable",
                      "Very sluggish and unfocused",
                      "Anxious or restless",
                    ].map((option) => (
                      <Button
                        key={option}
                        variant={focusProfile.afternoon === option ? "default" : "outline"}
                        onClick={() => setFocusProfile({ ...focusProfile, afternoon: option })}
                        className={`justify-start p-4 ${focusProfile.afternoon === option ? "bg-purple-500 hover:bg-purple-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    What app or activity tempts you most during work?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Social Media", "YouTube/TikTok", "News/Reddit", "Messaging", "Gaming", "Shopping"].map(
                      (option) => (
                        <Button
                          key={option}
                          variant={focusProfile.temptation === option ? "default" : "outline"}
                          onClick={() => setFocusProfile({ ...focusProfile, temptation: option })}
                          className={`p-4 ${focusProfile.temptation === option ? "bg-red-500 hover:bg-red-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}`}
                        >
                          {option}
                        </Button>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button
                onClick={nextStep}
                disabled={!focusProfile.afternoon || !focusProfile.temptation}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">You're all set!</h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                FocusPilot is now personalized for your unique focus patterns and goals. Ready to start your journey?
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 max-w-md mx-auto">
              <h3 className="text-white font-semibold mb-4">Your Focus Profile:</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>
                  Goal: <span className="text-purple-400">{goals.find((g) => g.id === selectedGoal)?.title}</span>
                </div>
                <div>
                  Peak Energy: <span className="text-green-400">{energyMap.peak}</span>
                </div>
                <div>
                  Low Energy: <span className="text-red-400">{energyMap.low}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Launch Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">{renderStep()}</div>
      </div>
    </div>
  )
}
