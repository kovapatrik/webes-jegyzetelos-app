import React, { useEffect, useState, useContext } from 'react';
import { GetSearchResult } from '../../lib/search';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { IconButton, InputBase, Toolbar, styled, alpha, Box, Grid, List, ListItemButton, ListItemText, ListItem, Autocomplete, TextField } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { PanoramaFishEye, ViewSidebarOutlined } from '@mui/icons-material';
import NavButton from './navButton';
import Link from 'next/link';
import { ToggleContext, ToggleContextType } from '../../context/toggleContext';
import { useCookies } from 'react-cookie';
import BlindLogo from '../assets/BlindLogo';


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
	toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};
interface resdata {
	id: string;
	user_id: string;
	data: string | null;
	created_at: string;
	title: string;
	last_modify: string;
	note_group_id: string;
}

const PREFERENCE_COOKIE_NAME = 'theme-preference';

export const Navbar = (props: NavbarProps) => {
	const supaBaseClient = useSupabaseClient();

	const [searchTerm, setSearchTerm] = useState('');
	const [resultdata, setResultsData] = useState<Array<resdata> | null>([]);

	const { onToggle, toggle, toggleTheme } = props;

	useEffect(() => {
		async function getData() {
			const results = await GetSearchResult({ searchTerm, supabaseServerClient: supaBaseClient });
			setResultsData(results);
		}
		if (searchTerm) {
			getData();
		}
		else {
			setResultsData(null);
		}

	}, [searchTerm]);

	const handleSelectItem = () => { setSearchTerm(''); }

	const { view, changeTheme } = useContext<ToggleContextType>(ToggleContext);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

	useEffect(() => {
		if (view === 'weak') {
			setCookieTheme(PREFERENCE_COOKIE_NAME, 'weak');
		} else {
			setCookieTheme(PREFERENCE_COOKIE_NAME, 'light');
		}
	}, [view]);

	return (
		<Toolbar>
			<Grid container justifyContent={'space-between'}>
				<Grid item>{!toggle && <NavButton Icon={<ViewSidebarOutlined />} onClick={onToggle} />}</Grid>
				<Grid item>
					<Grid container>
						<Box px={1}>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									onChange={(serachVal) => setSearchTerm(serachVal.target.value)}
									placeholder="Search…"
									inputProps={{ 'aria-label': 'search' }}
									value={searchTerm}
								/>
							</Search>
							<List>
								{resultdata && resultdata.map((item: resdata) => (
									<Link href={`/${item.note_group_id}/${item.id}`} passHref key={item.id}>
										<ListItem button
											onClick={handleSelectItem}
										>
											<ListItemText primary={item.title} />
										</ListItem>
									</Link>

								))}
							</List>
						</Box>
						<Box px={1}>
							<NavButton Icon={<ContrastIcon />} disabled={view === 'weak'} onClick={toggleTheme} />
						</Box>
						<Box px={1}>
							<NavButton onClick={() => changeTheme(view === 'normal' ? 'weak' : 'normal')}>
								<BlindLogo />
							</NavButton>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
};
