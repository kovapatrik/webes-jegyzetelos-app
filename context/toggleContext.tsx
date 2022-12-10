import * as React from 'react';

export interface Props {
	children: React.ReactNode;
}

export type View = 'normal' | 'weak';

export type ToggleContextType = {
	view: View;
	changeTheme: (view: View) => void;
};

export const ToggleContext = React.createContext<ToggleContextType>({
	view: 'normal',
	changeTheme() {
		return 'normal';
	},
});

const ViewProvider: React.FC<Props> = ({ children }) => {
	const [themeMode, setThemeMode] = React.useState<View>('normal');

	return <ToggleContext.Provider value={{ view: themeMode, changeTheme: setThemeMode }}>{children}</ToggleContext.Provider>;
};

export default ViewProvider;
