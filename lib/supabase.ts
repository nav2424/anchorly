import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          timezone: string
          onboarding_completed: boolean
          focus_goal_daily: number
          focus_goal_weekly: number
          preferred_session_duration: number
          break_duration: number
          long_break_duration: number
          notification_preferences: any
          theme_preference: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          timezone?: string
          onboarding_completed?: boolean
          focus_goal_daily?: number
          focus_goal_weekly?: number
          preferred_session_duration?: number
          break_duration?: number
          long_break_duration?: number
          notification_preferences?: any
          theme_preference?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          timezone?: string
          onboarding_completed?: boolean
          focus_goal_daily?: number
          focus_goal_weekly?: number
          preferred_session_duration?: number
          break_duration?: number
          long_break_duration?: number
          notification_preferences?: any
          theme_preference?: string
          created_at?: string
          updated_at?: string
        }
      }
      focus_sessions: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          duration_minutes: number
          completed_minutes: number
          status: string
          focus_score: number | null
          mood_before: number | null
          mood_after: number | null
          energy_before: number | null
          energy_after: number | null
          tags: string[] | null
          notes: string | null
          started_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          duration_minutes: number
          completed_minutes?: number
          status?: string
          focus_score?: number | null
          mood_before?: number | null
          mood_after?: number | null
          energy_before?: number | null
          energy_after?: number | null
          tags?: string[] | null
          notes?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          duration_minutes?: number
          completed_minutes?: number
          status?: string
          focus_score?: number | null
          mood_before?: number | null
          mood_after?: number | null
          energy_before?: number | null
          energy_after?: number | null
          tags?: string[] | null
          notes?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string
          date: string
          mood: number
          energy: number
          stress: number
          sleep_hours: number | null
          sleep_quality: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          mood: number
          energy: number
          stress: number
          sleep_hours?: number | null
          sleep_quality?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          mood?: number
          energy?: number
          stress?: number
          sleep_hours?: number | null
          sleep_quality?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          goal_type: string
          target_value: number
          current_value: number
          unit: string
          start_date: string
          end_date: string | null
          status: string
          priority: number
          color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          goal_type: string
          target_value: number
          current_value?: number
          unit: string
          start_date: string
          end_date?: string | null
          status?: string
          priority?: number
          color?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          goal_type?: string
          target_value?: number
          current_value?: number
          unit?: string
          start_date?: string
          end_date?: string | null
          status?: string
          priority?: number
          color?: string
          created_at?: string
          updated_at?: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          frequency: string
          frequency_config: any
          target_value: number
          unit: string
          color: string
          icon: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          frequency: string
          frequency_config?: any
          target_value?: number
          unit?: string
          color?: string
          icon?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          frequency?: string
          frequency_config?: any
          target_value?: number
          unit?: string
          color?: string
          icon?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      habit_entries: {
        Row: {
          id: string
          user_id: string
          habit_id: string
          date: string
          completed: boolean
          value: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          habit_id: string
          date: string
          completed?: boolean
          value?: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          habit_id?: string
          date?: string
          completed?: boolean
          value?: number
          notes?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          action_url: string | null
          metadata: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          read?: boolean
          action_url?: string | null
          metadata?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          action_url?: string | null
          metadata?: any
          created_at?: string
        }
      }
      analytics_summary: {
        Row: {
          id: string
          user_id: string
          date: string
          total_focus_minutes: number
          completed_sessions: number
          average_focus_score: number | null
          mood_average: number | null
          energy_average: number | null
          stress_average: number | null
          habits_completed: number
          habits_total: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          total_focus_minutes?: number
          completed_sessions?: number
          average_focus_score?: number | null
          mood_average?: number | null
          energy_average?: number | null
          stress_average?: number | null
          habits_completed?: number
          habits_total?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          total_focus_minutes?: number
          completed_sessions?: number
          average_focus_score?: number | null
          mood_average?: number | null
          energy_average?: number | null
          stress_average?: number | null
          habits_completed?: number
          habits_total?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
