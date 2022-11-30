import { Button } from '@mui/material/';
import { MouseEventHandler, ReactNode } from 'react';

type NavButtonProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	Icon?: JSX.Element;
	disabled?: boolean;
	children?: ReactNode;
};
export default function NavButton(props: NavButtonProps) {
	const { onClick, Icon, disabled, children } = props;
	return (
		<Button onClick={onClick} disabled={disabled} id='weak'>
			{Icon ?? children}
		</Button>
	);
}
