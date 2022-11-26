import { createTheme } from '@mui/material';

export const weakTheme = createTheme({
	palette: {
		mode: 'light',
		text: {
			primary: '#FF0000',
			secondary: '#FF0000',
		},
	},
	components: {
		MuiGrid: {
			styleOverrides: {
				root: {
					'& #composition-button': {
						color: '#20DF7F',
						backgroundColor: '#1e1e1e',
					},
					'& #sidebar': {
						backgroundColor: '#FF0000',
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
