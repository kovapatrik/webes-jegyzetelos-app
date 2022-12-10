import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { ChangeEvent } from 'react';

type NewNoteDialogProps = {
    open: boolean;
    onClose: () => void;
    dialogValue: string;
    onTitleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleCreate: () => Promise<void>;
}

function NewNoteDialog(props: NewNoteDialogProps) {
    const { open, onClose, dialogValue, handleCreate, onTitleChange} = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>New note</DialogTitle>
			<DialogContent>
				<TextField
					value={dialogValue}
					autoFocus
					margin='normal'
					id='title'
					label='New note title'
					type='text'
					fullWidth
					variant='outlined'
					onChange={onTitleChange}
				/>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button disabled={dialogValue === ''} type='button' onClick={handleCreate}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default NewNoteDialog;
