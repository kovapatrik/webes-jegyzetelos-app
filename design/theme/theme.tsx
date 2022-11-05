import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1400,
			xl: 1636,
		},
	},
	components: {},
});

export default defaultTheme;
