
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
		MuiPaper: {
			styleOverrides:{
				root:{
					"& .MuiButtonBase-root": {
						color: '#000000',
						backgroundColor: '#FFFF00',
						fontSize: '30px',
					},
					"& .MuiList-padding": {
						color: '#000000',
						backgroundColor: '#FFFF00',
					},

				},
			},
		},
		MuiGrid: {
			styleOverrides: {
				root: {
					'& #weakButton': {
						fill: '#000000',
						backgroundColor: '#FFFF00',
						width: '50px',
						height: '50px',
					},
					"& .MuiTypography-root": {
						color: '#FFFF00',
						fontSize: '30px',
					},
					'& #composition-button': {
						color: '#000000',
						backgroundColor: '#FFFF00',
						fontSize: '30px',
					},
					'& #sidebar': {
						backgroundColor: '#000000',
						' ul li svg': {
							color: '#FFFF00',
						},
						' ul li p': {
							color: '#FFFF00',
							fontSize: '30px',
						},
						'& #avatarName': {
							'& p': {
								color: '#000000',
								fontSize: '30px',
							},
						},
					},
					'& #mainContainer': {
						'& p': {
							color: '#000000',
							fontSize: '30px',
						},
						'& li a': {
							color: '#000000',
							fontSize: '30px',
						},
						'& #imageCard': {
							backgroundColor: '#FFFF00',
							border: '0.5px solid #000000',
							fontSize: '30px',
						},
						'& #smallMenuItem': {
							color: '#000000',
							fontSize: '30px',
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
					fontSize: '30px',
					height: '30px',
					width: '30px',
					'&:hover': {
						backgroundColor: '#FFFF00',
						fontSize: '30px',
					},
					'&:active': {
						backgroundColor: '#FFFF00',
						fontSize: '30px',
					},
				},
			},
		},
	},
});