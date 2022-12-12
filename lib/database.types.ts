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
          data: string
          last_modify: string
          note_group_id: string
          fts: unknown | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          title: string
          data?: string
          last_modify?: string
          note_group_id: string
          fts?: unknown | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          title?: string
          data?: string
          last_modify?: string
          note_group_id?: string
          fts?: unknown | null
        }
      }
      note_group: {
        Row: {
          id: string
          created_at: string
          title: string
          base_note_group_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          base_note_group_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          base_note_group_id?: string | null
          user_id?: string
        }
      }
      note_perm: {
        Row: {
          created_at: string
          user_id: string
          note_group_id: string
          note_id: string
          view_perm: boolean
          edit_perm: boolean
          owner_user_id: string
          id: string
        }
        Insert: {
          created_at?: string
          user_id: string
          note_group_id: string
          note_id: string
          view_perm?: boolean
          edit_perm?: boolean
          owner_user_id: string
          id?: string
        }
        Update: {
          created_at?: string
          user_id?: string
          note_group_id?: string
          note_id?: string
          view_perm?: boolean
          edit_perm?: boolean
          owner_user_id?: string
          id?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
        }
        Insert: {
          id: string
          email: string
          name: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
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
