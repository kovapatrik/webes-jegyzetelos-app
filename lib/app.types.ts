import { Database } from "./database.types";

export interface SharedAppProps {
    toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
	toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
	toggle: boolean;
}

export type AllPerms = Database['public']['Tables']['note_perm']['Row'] & {
	users:  Database['public']['Tables']['users']['Row']
}
