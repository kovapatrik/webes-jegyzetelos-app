import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
	components: {
		MuiToolbar: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					borderBottom: `0.5px solid #ffffff`,
					backgroundColor: '#1b1b1b',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: '#20DF7F',
					color: '#1b1b1b',
					'&:hover': {
						backgroundColor: '#50d568',
					},
					'&:active': {
						backgroundColor: '#50d568',
					},
				},
			},
		},
		MuiGrid: {
			styleOverrides: {
				root: {
					'& #weakButton': {
						fill: '#1b1b1b',
					},
					'& #composition-button': {
						color: '#2e2e2e',
						backgroundColor: '#e9fcf2',
					},

					'& #sidebar': {
						border: '0.5px solid #2e2e2e',
						backgroundColor: '#3ab27b',
						' ul li svg': {
							color: '#2e2e2e',
						},
						' ul li p': {
							color: '#2e2e2e',
						},
					},
					'& #avatarName': {
						'& p': {
							color: '#ffffff',
						},
					},

					'& #mainContainer': {
						backgroundColor: '#1b1b1b',
						'& p': {
							color: '#e9fcf2',
						},
						'& li a': {
							color: '#e9fcf2',
						},
						'& #imageCard': {
							backgroundColor: '#1b1b1b',
							border: '0.5px solid #707070',
						},
						'& #smallMenuItem': {
							color: '#707070',
						},
					},
				},
			},
		},
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		text: {
			primary: '#348c5e',
			secondary: '#348c5e',
		},
	},
	components: {
		MuiGrid: {
			styleOverrides: {
				root: {
					'& #weakButton': {
						fill: '#3ab27b',
					},
					'& #composition-button': {
						color: '#20DF7F',
						backgroundColor: '#1e1e1e',
					},
					'& #sidebar': {
						backgroundColor: '#052029',
						' ul li svg': {
							color: '#ffffff',
						},
						' ul li p': {
							color: '#ffffff',
						},
						'& #avatarName': {
							'& p': {
								color: '#1C5E2E',
							},
						},
					},
					'& #mainContainer': {
						'& p': {
							color: '#093545',
						},
						'& li a': {
							color: '#093545',
						},
						'& #imageCard': {
							backgroundColor: '#ffffff',
							border: '0.5px solid #707070',
						},
						'& #smallMenuItem': {
							color: '#707070',
						},
					},
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					borderBottom: `0.5px solid #2e2e2e`,
					backgroundColor: '#3ab27b',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: '#052029',
					color: '#20DF7F',
					'&:hover': {
						backgroundColor: '#093545',
					},
					'&:active': {
						backgroundColor: '#093545',
					},
				},
			},
		},
	},
});
