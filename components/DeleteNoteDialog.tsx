import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, DialogProps, DialogContentProps } from '@mui/material';
import { ChangeEvent } from 'react';

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
            <DialogContent>
                Are you sure you want to delete?
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button type='button' color='error' onClick={onConfirm}>
                    Confirm
                </Button>
                <Button type='button' onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
	);
}

export default DeleteNoteDialog;
