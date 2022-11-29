
import { createTheme } from '@mui/material';

export const weakTheme = createTheme({
	palette: {
		mode: 'dark',
		text: {
			primary: '#FFFF00',
			secondary: '#FFFF00',
		},
	},
	components: {
		MuiGrid: {
			styleOverrides: {
				root: {
					'& #composition-button': {
						color: '#000000',
						backgroundColor: '#FFFF00',
						fontSize: '60px',
					},
					'& #sidebar': {
						backgroundColor: '#000000',
						fontSize: '55px',
						' ul li svg': {
							color: '#FFFF00',
							fontSize: '55px',
						},
						' ul li p': {
							color: '#FFFF00',
							fontSize: '55px',
						},
						'& #avatarName': {
							'& p': {
								color: '#000000',
								fontSize: '55px',
							},
						},
					},
					'& #mainContainer': {
						'& p': {
							color: '#000000',
							fontSize: '55px',
						},
						'& li a': {
							color: '#000000',
							fontSize: '55px',
						},
						'& #imageCard': {
							backgroundColor: '#FFFF00',
							border: '0.5px solid #000000',
							fontSize: '55px',
						},
						'& #smallMenuItem': {
							color: '#000000',
							fontSize: '55px',
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
					borderBottom: `0.5px solid #000000`,
					backgroundColor: '#FFFF00',
					fontSize: '55px',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: '#FFFF00',
					color: '#000000',
					fontSize: '55px',
					'&:hover': {
						backgroundColor: '#FFFF00',
						fontSize: '55px',
					},
					'&:active': {
						backgroundColor: '#FFFF00',
						fontSize: '55px',
					},
				},
			},
		},
	},
});