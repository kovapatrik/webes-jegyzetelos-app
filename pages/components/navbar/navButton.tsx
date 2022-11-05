import { Button } from '@mui/material/';
import { MouseEventHandler } from 'react';

type NavButtonProps = {
	color: string;
	bgColor: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	hoverColor: string;
	Icon: JSX.Element;
};
export default function NavButton(props: NavButtonProps) {
	const { color, bgColor, onClick, Icon, hoverColor } = props;
	return (
		<Button
			sx={[
				{
					color: color,
					backgroundColor: bgColor,
				},
				{
					'&:hover': {
						color: 'white',
						backgroundColor: hoverColor,
					},
				},
			]}
			onClick={onClick}
		>
			{Icon}
		</Button>
	);
}
