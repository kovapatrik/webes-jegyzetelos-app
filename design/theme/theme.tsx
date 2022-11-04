import { colors } from './themeColors';
import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
	},
	palette: {
		text: {
			primary: colors.dark.main.m20,
			secondary: colors.dark.primary.p100,
		},
		primary: {
			main: colors.dark.primary.p100,
		},
		background: {
			default: colors.dark.main.m20,
		},
	},
	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: colors.dark.primary.p100,
					color: colors.dark.white,
					'&:hover': {
						backgroundColor: colors.dark.primary.p80,
					},
					'&:active': {
						backgroundColor: colors.dark.primary.p120,
					},
				},
			},
		},
	},
});

export default defaultTheme;
