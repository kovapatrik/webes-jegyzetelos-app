import { Database } from "./database.types";

export interface SharedAppProps {
    toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
	toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
	toggle: boolean;
	selectedTheme: 'light' | 'dark'
}

export type AllPerms = Database['public']['Tables']['note_perm']['Row'] & {
	users:  Database['public']['Tables']['users']['Row']
}
