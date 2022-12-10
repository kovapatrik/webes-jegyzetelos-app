import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { ChangeEvent } from 'react';

type NewNoteDialogProps = {
	open: boolean;
	groupNoteModal: boolean;
	onClose: () => void;
	dialogValue: string;
	onTitleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
	handleCreate: () => Promise<void>;
};

function NewNoteOrNoteGroupDialog(props: NewNoteDialogProps) {
	const { open, onClose, dialogValue, handleCreate, onTitleChange, groupNoteModal } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>New {groupNoteModal ? 'note group' : 'note'}</DialogTitle>
			<DialogContent>
				<TextField
					value={dialogValue}
					autoFocus
					margin='normal'
					id='title'
					label={groupNoteModal ? 'New note group' : 'New note'}
					type='text'
					fullWidth
					variant='outlined'
					onChange={onTitleChange}
				/>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button disabled={dialogValue === ''} variant='contained' type='button' onClick={handleCreate}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default NewNoteOrNoteGroupDialog;
