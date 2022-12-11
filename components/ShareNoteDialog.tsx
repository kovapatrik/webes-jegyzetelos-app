import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Checkbox } from '@mui/material';
import { ChangeEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { AllPerms } from '../lib/app.types';

type NewNoteDialogProps = {
	open: boolean;
	onClose: () => void;
	dialogValue: string;
	onEmailChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
	allPerms?: AllPerms[]
};

function ShareNoteDialog(props: NewNoteDialogProps) {
	const { open, onClose, dialogValue, onEmailChange } = props;
	const [openDrop, setOpenDrop] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpenDrop(prevOpen => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpenDrop(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpenDrop(false);
		} else if (event.key === 'Escape') {
			setOpenDrop(false);
		}
	}

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
				<List sx={{ height: '200px' }}>
					{props.allPerms?.map((elem, key) => {
						return (
							<ListItem
								key={key}
								secondaryAction={
									<div>
										<IconButton
											ref={anchorRef}
											id='composition-button'
											aria-controls={openDrop ? 'composition-menu' : undefined}
											aria-expanded={openDrop ? 'true' : undefined}
											aria-haspopup='true'
											onClick={handleToggle}
										>
											<ExpandMoreIcon />
										</IconButton>

										<Popper
											open={openDrop}
											anchorEl={anchorRef.current}
											role={undefined}
											placement='bottom-start'
											transition
											disablePortal
											sx={{ position: 'absolute' }}
										>
											{({ TransitionProps, placement }) => (
												<Grow
													{...TransitionProps}
													style={{
														transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
													}}
												>
													<Paper>
														<ClickAwayListener onClickAway={handleClose}>
															<MenuList
																autoFocusItem={openDrop}
																id='composition-menu'
																aria-labelledby='composition-button'
																onKeyDown={handleListKeyDown}
															>
																<MenuItem onClick={handleClose}>
																	Read only <Checkbox></Checkbox>
																</MenuItem>
																<MenuItem onClick={handleClose}>
																	Write <Checkbox></Checkbox>
																</MenuItem>
															</MenuList>
														</ClickAwayListener>
													</Paper>
												</Grow>
											)}
										</Popper>
									</div>
								}
							>
								<ListItemText primary={elem.users.email} />
							</ListItem>
						);
					})}
				</List>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button variant='contained' disabled={dialogValue === ''} type='button' onClick={onClose}>
					Share
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ShareNoteDialog;
