import { Button } from '@mui/material/';
import { MouseEventHandler } from 'react';

type NavButtonProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	Icon: JSX.Element;
	disabled?: boolean;
};
export default function NavButton(props: NavButtonProps) {
	const { onClick, Icon, disabled } = props;
	return (
		<Button onClick={onClick} disabled={disabled} id='weak'>
			{Icon}
		</Button>
	);
}
