import { supabase } from "./supabase"
import type { Database } from "./supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export type FocusSession = Database["public"]["Tables"]["focus_sessions"]["Row"]
export type FocusSessionInsert = Database["public"]["Tables"]["focus_sessions"]["Insert"]
export type FocusSessionUpdate = Database["public"]["Tables"]["focus_sessions"]["Update"]

export type MoodEntry = Database["public"]["Tables"]["mood_entries"]["Row"]
export type MoodEntryInsert = Database["public"]["Tables"]["mood_entries"]["Insert"]

export type Notification = Database["public"]["Tables"]["notifications"]["Row"]
export type NotificationInsert = Database["public"]["Tables"]["notifications"]["Insert"]

export type Goal = Database["public"]["Tables"]["goals"]["Row"]
export type GoalInsert = Database["public"]["Tables"]["goals"]["Insert"]
export type GoalUpdate = Database["public"]["Tables"]["goals"]["Update"]

export type Habit = Database["public"]["Tables"]["habits"]["Row"]
export type HabitInsert = Database["public"]["Tables"]["habits"]["Insert"]
export type HabitUpdate = Database["public"]["Tables"]["habits"]["Update"]

export type HabitEntry = Database["public"]["Tables"]["habit_entries"]["Row"]
export type HabitEntryInsert = Database["public"]["Tables"]["habit_entries"]["Insert"]

export type AnalyticsSummary = Database["public"]["Tables"]["analytics_summary"]["Row"]

export const database = {
  // Profile operations
  async getProfile(userId: string): Promise<Profile | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error fetching profile:", error)
      return null
    }
  },

  async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single()

      if (error) {
        console.error("Error updating profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error updating profile:", error)
      return null
    }
  },

  // Focus session operations
  async getFocusSessions(userId: string, limit = 50): Promise<FocusSession[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase
        .from("focus_sessions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        console.error("Error fetching focus sessions:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching focus sessions:", error)
      return []
    }
  },

  async createFocusSession(session: FocusSessionInsert): Promise<FocusSession | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.from("focus_sessions").insert(session).select().single()

      if (error) {
        console.error("Error creating focus session:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error creating focus session:", error)
      return null
    }
  },

  async updateFocusSession(sessionId: string, updates: FocusSessionUpdate): Promise<FocusSession | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from("focus_sessions")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", sessionId)
        .select()
        .single()

      if (error) {
        console.error("Error updating focus session:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error updating focus session:", error)
      return null
    }
  },

  // Mood entry operations
  async getMoodEntries(userId: string, limit = 30): Promise<MoodEntry[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        console.error("Error fetching mood entries:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching mood entries:", error)
      return []
    }
  },

  async createMoodEntry(entry: MoodEntryInsert): Promise<MoodEntry | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.from("mood_entries").insert(entry).select().single()

      if (error) {
        console.error("Error creating mood entry:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error creating mood entry:", error)
      return null
    }
  },

  // Goal operations
  async getGoals(userId: string): Promise<Goal[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching goals:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching goals:", error)
      return []
    }
  },

  async createGoal(goal: GoalInsert): Promise<Goal | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.from("goals").insert(goal).select().single()

      if (error) {
        console.error("Error creating goal:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error creating goal:", error)
      return null
    }
  },

  async updateGoal(goalId: string, updates: GoalUpdate): Promise<Goal | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from("goals")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", goalId)
        .select()
        .single()

      if (error) {
        console.error("Error updating goal:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error updating goal:", error)
      return null
    }
  },

  // Habit operations
  async getHabits(userId: string): Promise<Habit[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", userId)
        .eq("active", true)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching habits:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching habits:", error)
      return []
    }
  },

  async createHabit(habit: HabitInsert): Promise<Habit | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.from("habits").insert(habit).select().single()

      if (error) {
        console.error("Error creating habit:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error creating habit:", error)
      return null
    }
  },

  async getHabitEntries(userId: string, date: string): Promise<HabitEntry[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase.from("habit_entries").select("*").eq("user_id", userId).eq("date", date)

      if (error) {
        console.error("Error fetching habit entries:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching habit entries:", error)
      return []
    }
  },

  async createHabitEntry(entry: HabitEntryInsert): Promise<HabitEntry | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.from("habit_entries").insert(entry).select().single()

      if (error) {
        console.error("Error creating habit entry:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error creating habit entry:", error)
      return null
    }
  },

  // Notification operations
  async getNotifications(userId: string): Promise<Notification[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) {
        console.error("Error fetching notifications:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching notifications:", error)
      return []
    }
  },

  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    if (!supabase) return false

    try {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

      if (error) {
        console.error("Error marking notification as read:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Unexpected error marking notification as read:", error)
      return false
    }
  },

  // Analytics operations
  async getProductivityStats(userId: string, daysBack = 30): Promise<any> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase.rpc("get_user_productivity_stats", {
        user_uuid: userId,
        days_back: daysBack,
      })

      if (error) {
        console.error("Error fetching productivity stats:", error)
        return null
      }

      return data?.[0] || null
    } catch (error) {
      console.error("Unexpected error fetching productivity stats:", error)
      return null
    }
  },

  async getFocusStreak(userId: string): Promise<number> {
    if (!supabase) return 0

    try {
      const { data, error } = await supabase.rpc("get_user_focus_streak", {
        user_uuid: userId,
      })

      if (error) {
        console.error("Error fetching focus streak:", error)
        return 0
      }

      return data || 0
    } catch (error) {
      console.error("Unexpected error fetching focus streak:", error)
      return 0
    }
  },
}
