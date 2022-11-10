import { TypographyOptions } from '@mui/material/styles/createTypography';

export const PRIMARY_FONT = 'Lexend Deca';

export default {
	fontFamily: [PRIMARY_FONT].join(','),
	h1: {
		fontFamily: PRIMARY_FONT,
		fontSize: 64,
		fontWeight: 400,
		lineHeight: '80px',
	},
	h2: {
		fontFamily: PRIMARY_FONT,
		fontSize: 18,
		fontWeight: 500,
		lineHeight: '23px',
	},
	h3: {
		fontSize: 16,
		fontWeight: 400,
		lineHeight: '20px',
		fontFamily: PRIMARY_FONT,
	},
	body1: {
		fontSize: 16,
		fontWeight: 500,
		lineHeight: '20px',
	},
	body2: {
		fontSize: 12,
		fontWeight: 400,
		lineHeight: '16px',
	},
	caption: {
		fontSize: 12,
		fontWeight: 500,
		lineHeight: '15px',
	},
} as TypographyOptions;
