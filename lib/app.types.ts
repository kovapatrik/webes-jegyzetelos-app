export interface SharedAppProps {
    toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
	toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
	toggle: boolean;
	selectedTheme: 'light' | 'dark'
}