export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      note: {
        Row: {
          id: string
          user_id: string
          created_at: string
          title: string
          data: string | null
          last_modify: string
          note_group_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          title: string
          data?: string | null
          last_modify?: string
          note_group_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          title?: string
          data?: string | null
          last_modify?: string
          note_group_id?: string | null
        }
      }
      note_group: {
        Row: {
          id: string
          created_at: string
          title: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
        }
      }
      note_perm: {
        Row: {
          id: string
          created_at: string
          user_id: string
          note_group_id: string | null
          note_id: string
          view_perm: boolean
          edit_perm: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          note_group_id?: string | null
          note_id: string
          view_perm?: boolean
          edit_perm?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          note_group_id?: string | null
          note_id?: string
          view_perm?: boolean
          edit_perm?: boolean
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
