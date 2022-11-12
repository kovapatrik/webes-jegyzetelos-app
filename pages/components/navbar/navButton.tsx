import { Button } from '@mui/material/';
import { MouseEventHandler } from 'react';

type NavButtonProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	Icon: JSX.Element;
};
export default function NavButton(props: NavButtonProps) {
	const { onClick, Icon } = props;
	return <Button onClick={onClick}>{Icon}</Button>;
}
