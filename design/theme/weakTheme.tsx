import { createTheme } from '@mui/material';

export const weakTheme = createTheme({
	palette: {
		mode: 'dark',
		// text: {
		// 	primary: '#FF0000',
		// 	secondary: '#FF0000',
		// },
	},
	components: {
		MuiGrid: {
			styleOverrides: {
				root: {
					// Some CSS
					borderBottom: `0.5px solid #FFFF00`,
					backgroundColor: '#1b1b1b',
				},
					'& #sidebar': {
						backgroundColor: '#FF0000',
						' ul li svg': {
							color: '#FFFF00',
						},
						' ul li p': {
							color: '#FFFF00',
						},
						'& #avatarName': {
							'& p': {
								color: '	#000000',
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
							backgroundColor: '#FFFF00',
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
					backgroundColor: '#FFFF00',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: '#FFFF00',
					color: '#1b1b1b',
					'&:hover': {
						backgroundColor: '#FFFF00',
					},
					'&:active': {
						backgroundColor: '#FFFF00',
					},
				},
			},
		},
	},
});
