import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
interface DeleteNoteDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

function DeleteNoteDialog(props: DeleteNoteDialogProps) {
	const { open, onClose, onConfirm } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Delete note</DialogTitle>
			<DialogContent>Are you sure you want to delete?</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button
					sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
					type='button'
					variant='contained'
					onClick={onConfirm}
				>
					Confirm
				</Button>
				<Button type='button' variant='contained' onClick={onClose}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteNoteDialog;
