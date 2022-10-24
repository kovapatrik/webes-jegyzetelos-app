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
          user_id: string | null
          created_at: string | null
          title: string | null
          data: string | null
          last_modify: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          created_at?: string | null
          title?: string | null
          data?: string | null
          last_modify?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          created_at?: string | null
          title?: string | null
          data?: string | null
          last_modify?: string | null
        }
      }
      note_group: {
        Row: {
          id: string
          note_id: string | null
          created_at: string | null
          title: string | null
          notes_name: string | null
        }
        Insert: {
          id?: string
          note_id?: string | null
          created_at?: string | null
          title?: string | null
          notes_name?: string | null
        }
        Update: {
          id?: string
          note_id?: string | null
          created_at?: string | null
          title?: string | null
          notes_name?: string | null
        }
      }
      note_perm: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
          notegroup_id: string | null
          note_id: string | null
          view_perm: boolean | null
          edit_perm: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          notegroup_id?: string | null
          note_id?: string | null
          view_perm?: boolean | null
          edit_perm?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          notegroup_id?: string | null
          note_id?: string | null
          view_perm?: boolean | null
          edit_perm?: boolean | null
        }
      }
      users: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
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
