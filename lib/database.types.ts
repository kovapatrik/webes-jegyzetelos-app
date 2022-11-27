export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			note: {
				Row: {
					id: string;
					user_id: string;
					created_at: string;
					title: string;
					data: string | null;
					last_modify: string;
					note_group_id: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					created_at?: string;
					title: string;
					data?: string | null;
					last_modify?: string;
					note_group_id: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					created_at?: string;
					title?: string;
					data?: string | null;
					last_modify?: string;
					note_group_id?: string;
				};
			};
			note_group: {
				Row: {
					id: string;
					created_at: string;
					title: string;
					base_note_group_id: string | null;
					user_id: string;
				};
				Insert: {
					id?: string;
					created_at?: string;
					title: string;
					base_note_group_id?: string | null;
					user_id: string;
				};
				Update: {
					id?: string;
					created_at?: string;
					title?: string;
					base_note_group_id?: string | null;
					user_id?: string;
				};
			};
			note_perm: {
				Row: {
					id: string;
					created_at: string;
					user_id: string;
					note_group_id: string;
					note_id: string;
					view_perm: boolean;
					edit_perm: boolean;
					owner_user_id: string;
				};
				Insert: {
					id?: string;
					created_at?: string;
					user_id: string;
					note_group_id: string;
					note_id: string;
					view_perm?: boolean;
					edit_perm?: boolean;
					owner_user_id: string;
				};
				Update: {
					id?: string;
					created_at?: string;
					user_id?: string;
					note_group_id?: string;
					note_id?: string;
					view_perm?: boolean;
					edit_perm?: boolean;
					owner_user_id?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}

export interface NoteWithPerms {
	note: Database['public']['Tables']['note']['Row'];
	perms: Database['public']['Tables']['note_perm']['Row'];
}
