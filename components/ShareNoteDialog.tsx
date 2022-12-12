import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Checkbox,  Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import { AllPerms } from '../lib/app.types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../lib/database.types';
import RestoreIcon from '@mui/icons-material/Restore';

type NewNoteDialogProps = {
    open: boolean;
    onClose: () => void;
    setOpen: (open: boolean) => void;
    allPerms?: AllPerms[];
    note_id?: string;
    note_group_id?: string;
};

type ShareType = AllPerms & {
    delete:boolean;
}

function ShareNoteDialog(props: NewNoteDialogProps) {
    const { open, onClose } = props;

    const initialData : ShareType[] = props.allPerms?.map((p) => ( {...p, delete: false} )) || []

    const [ userPerms, setUserPerms ] = useState<ShareType[]>(initialData);
    const supabaseClient = useSupabaseClient<Database>()
    const [email, setEmail] = useState('');
    
    async function handleAddUser() {

        const { error, data } = await supabaseClient.from('users')
                                                    .select()
                                                    .eq('email', email)
                                                    .single()
        if (error) {
            console.log(error)
        } else {
            console.log(data)
            const res = await fetch(`/api/note-perm/`, {
                method: 'POST',
                body: JSON.stringify({
                    note_group_id: props.note_group_id,
                    note_id: props.note_id,
                    user_id: data.id
                }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log(res)
            
            if (res.status === 200) {
                const { note_perm } = await res.json()
                setUserPerms(prevState => [...prevState, {...note_perm, delete: false}])
            }
        }
    }

    function handleSave() {
        userPerms?.flatMap(async (p) => {
            if (p.delete) {
                await fetch(`/api/note-perm/${p.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                await fetch(`/api/note-perm/${p.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        view_perm: p.view_perm,
                        edit_perm: p.edit_perm,
                        id: p.id
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
            }
        })

        setUserPerms(userPerms?.filter((p) => !p.delete))
        props.setOpen(false)
    }

    if (!props.note_id || !props.note_group_id) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share note</DialogTitle>
            <DialogContent>
                <Box textAlign={'center'}>
                    <TextField
                        value={email}
                        autoFocus
                        margin='normal'
                        id='email'
                        label='E-mail'
                        type='email'
                        fullWidth
                        variant='outlined'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Button startIcon={<PersonAddIcon/>} style={{width: 'fit-content'}} onClick={() => handleAddUser()}>
                        Add new user
                    </Button>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Email
                            </TableCell>
                            <TableCell>
                                Read permission
                            </TableCell>
                            <TableCell>
                                Write permission
                            </TableCell>
                            <TableCell>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userPerms?.map((elem, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell component={'th'} scope='row'>
                                        {elem.users.email}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={elem.view_perm} onChange={(_, checked) => setUserPerms(userPerms.map((p) => {
                                            if (p.id === elem.id) {
                                                return {...p, view_perm: checked}
                                            } else {
                                                return p
                                            }
                                        }))}/>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={elem.edit_perm} onChange={(_, checked) => setUserPerms(userPerms.map((p) => {
                                            if (p.id === elem.id) {
                                                return {...p, edit_perm: checked}
                                            } else {
                                                return p
                                            }
                                        }))}/>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => setUserPerms(userPerms.map((p) => {
                                            if (p.id === elem.id) {
                                                return {...p, delete: !p.delete}
                                            } else {
                                                return p
                                            }
                                        }))}>
                                            { elem.delete ? 
                                                <RestoreIcon/>
                                            :
                                                <DeleteIcon/>
                                            }   
                                            
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' type='button' onClick={() => handleSave()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareNoteDialog;
