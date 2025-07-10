import { supabase } from "./supabase"
import type { Database } from "./supabase"

export type AuthUser = {
  id: string
  email: string
  profile?: Database["public"]["Tables"]["profiles"]["Row"]
}

export const auth = {
  async getCurrentUser(): Promise<AuthUser | null> {
    if (!supabase) return null

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) return null

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
      }

      return {
        id: user.id,
        email: user.email!,
        profile: profile || undefined,
      }
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },

  async signIn(email: string, password: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      // Convert Supabase error to user-friendly message
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        throw new Error("Invalid email or password. Please check your credentials and try again.")
      }
      throw new Error(error.message)
    }

    if (!data.user) {
      throw new Error("No user returned from sign in")
    }
  },

  async signUp(email: string, password: string, fullName?: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
        },
      },
    })

    if (error) {
      console.error("Sign up error:", error)
      throw new Error(error.message)
    }

    if (!data.user) {
      throw new Error("No user returned from sign up")
    }

    console.log("User signed up successfully:", data.user.id)
  },

  async signOut(): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured")

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Sign out error:", error)
      throw new Error(error.message)
    }
  },

  async signInWithProvider(provider: "google" | "github" | "apple"): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured")

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("OAuth sign in error:", error)
      throw new Error(error.message)
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    if (!supabase) {
      return { data: { subscription: { unsubscribe: () => {} } } }
    }

    return supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)

      if (session?.user) {
        try {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

          callback({
            id: session.user.id,
            email: session.user.email!,
            profile: profile || undefined,
          })
        } catch (error) {
          console.error("Error fetching profile in auth state change:", error)
          callback({
            id: session.user.id,
            email: session.user.email!,
          })
        }
      } else {
        callback(null)
      }
    })
  },

  async resetPassword(email: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      console.error("Reset password error:", error)
      throw new Error(error.message)
    }
  },

  async updatePassword(password: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured")

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      console.error("Update password error:", error)
      throw new Error(error.message)
    }
  },
}
