import { createContext } from 'react';

export type Colors = Record<string, string>;

export type AllColors = {
	main: Colors;
	primary: Colors;
};

export const colors = {
	white: '#ffffff',
	darkGray: '#1e1e1e',
	light: {
		main: {
			m20: '#e9fcf2',
			m40: '#9DAEB5',
			m60: '#6B868F',
			m80: '#3A5D6A',
			m100: '#093545',
			m120: '#052029',
		},
		primary: {
			p20: '#D2F9E5',
			p40: '#A6F2CC',
			p60: '#4DE599',
			p80: '#50d568',
			p100: '#20DF7F',
			p120: '#50d465',
			p150: '#1C5E2E',
		},
	},
	dark: {
		main: {
			white: '#ffffff',
			m60: '#707070',
			m80: '#2e2e2e',
			m100: '#1b1b1b',
		},
		primary: {
			p100: '#3ab27b',
			p120: '#20DF7F',
		},
	},
};

const ThemeContext = createContext({
	themeColor: colors.dark,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setThemeColor: (val: AllColors) => {
		console.log(val);
	},
});

export default ThemeContext;
