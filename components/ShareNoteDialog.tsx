import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { ChangeEvent } from 'react';

type NewNoteDialogProps = {
    open: boolean;
    onClose: () => void;
    dialogValue: string;
    onEmailChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

function ShareNoteDialog(props: NewNoteDialogProps) {
    const { open, onClose, dialogValue, onEmailChange} = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Share note</DialogTitle>
			<DialogContent>
				<TextField
					value={dialogValue}
					autoFocus
					margin='normal'
					id='email'
					label='E-mail'
					type='email'
					fullWidth
					variant='outlined'
					onChange={onEmailChange}
				/>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button disabled={dialogValue === ''} type='button' onClick={onClose}>
					Share
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ShareNoteDialog;
