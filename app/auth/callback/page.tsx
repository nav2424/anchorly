"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        console.error("Supabase not configured")
        router.push("/?error=config")
        return
      }

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          router.push("/?error=auth")
          return
        }

        if (data.session) {
          console.log("Auth callback successful, redirecting to dashboard")
          router.push("/")
        } else {
          console.log("No session found, redirecting to sign in")
          router.push("/?view=signin")
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error)
        router.push("/?error=unexpected")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto" />
        <p className="text-white">Completing sign in...</p>
      </div>
    </div>
  )
}
