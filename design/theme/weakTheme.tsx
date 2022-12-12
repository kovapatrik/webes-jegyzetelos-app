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
			styleOverrides: {
				root: {
					'& .MuiButtonBase-root': {
						color: '#000000',
						backgroundColor: '#FFFF00',
						fontSize: '20px',
					},
					'& .MuiList-padding': {
						color: '#000000',
						backgroundColor: '#FFFF00',
					},
					"& .MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root": {
						backgroundColor: '#000000',
					},
					"& .css-g41feg-MuiDialogActions-root": {
						backgroundColor: '#000000',
					},
					"& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root": {
						backgroundColor: '#000000',
					},
					"& .css-oqak2i-MuiButtonBase-root-MuiButton-root":{
						fontSize: '20px',
						height: '45px',
						width: '100px',
					},
					"& .MuiButtonBase-root-MuiButton-root:hover":{
						backgroundColor: '#FFFF00',
						fontSize: '1px',
					},
					"& .css-g41feg-MuiDialogActions-root>:not(:first-of-type)":{
						fontSize: '20px',
						height: '45px',
						width: '100px',
					},
					
					"&  .css-11rkxlr-MuiButtonBase-root-MuiButton-root":{
						fontSize: '20px',
						height: '45px',
						width: '100px',
					},
					"& .MuiTouchRipple-root:hover":{
						height: '30px',
						width: '30px',
						fontSize: '1px',
					},
					
					"& .css-11rkxlr-MuiButtonBase-root-MuiButton-root.Mui-disabled":{
						fontSize: '20px',
						height: '45px',
						width: '100px',
					},
				},
			},
		},
		MuiGrid: {
			styleOverrides: {
				root: {	
					"&  #searchicon": {
						backgroundColor: '#000000',
					},
					"&  #searchlist": {
						backgroundColor: '#000000',
					},
					"&  .css-mfzy4c:hover": {
						backgroundColor: '#000000',
					},
					"& .w-md-editor-toolbar": {
						backgroundColor: '#FFFF00',	
					},
					"& .w-md-editor-preview": {
						backgroundColor: '#FFFF00',	
					},
					"& .w-md-editor-text-input": {
						backgroundColor: '#FFFF00',	
						color: '#000000',
						'-webkit-text-fill-color':  '#000000',
					},

					"& .MuiGrid-spacing-xs-1 ": {
						backgroundColor: '#FFFF00',	
						color: '#000000',
						'-webkit-text-fill-color':  '#000000',
					},
					
					"& .css-1adr7mr-MuiGrid-root .w-md-editor-text-pre>code": {
						color: '#000000',
					},

					"& [data-color-mode*='light'] .wmde-markdown, [data-color-mode*='light'] .wmde-markdown-var, .wmde-markdown-var[data-color-mode*='light'], .wmde-markdown[data-color-mode*='light'], body[data-color-mode*='light']": {
						backgroundColor: '#FFFF00',	
						color: '#000000',
					},
					"& .wmde-markdown-color " : {
						backgroundColor: '#FFFF00'
					},
					"& .css-1udq3mp-MuiButtonBase-root-MuiButton-root.Mui-disabled" :{
						fontSize: '15px',
						height: '45px',
						width: '150px',
					},
					"& .css-1udq3mp-MuiButtonBase-root-MuiButton-root" :{
						fontSize: '15px',
						height: '45px',
						width: '150px',
					},
					'& #weakButton': {
						fill: '#000000',
						backgroundColor: '#FFFF00',
						width: '50px',
						height: '50px',
					},
					'& .MuiTypography-root': {
						color: '#FFFF00',
						fontSize: '30px',
					},
					'& #composition-button': {
						color: '#000000',
						backgroundColor: '#FFFF00',
						fontSize: '30px',
					},
					'& input': {
						backgroundColor: 'black',
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
							fontSize: '18px',
						},
						'& li a': {
							color: '#000000',
							fontSize: '30px',
						},
						'& #imageCard': {
							backgroundColor: '#000000',
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
					// fontSize: '30px',
					height: '45px',
					'&:hover': {
						backgroundColor: '#FFFF00',
						fontSize: '20px',
					},
					'&:active': {
						backgroundColor: '#FFFF00',
						fontSize: '20px',
					},
				},
			},
		},
	},
});
