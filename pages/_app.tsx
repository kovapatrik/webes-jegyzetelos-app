import * as React from 'react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { darkTheme, lightTheme } from '../design/theme/theme';
import createEmotionCache from '../design/theme/createEmotionCache';
import '@fontsource/lexend-deca';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from '@mui/material';
import ViewProvider from '../context/toggleContext';
import { weakTheme } from '../design/theme/weakTheme';

import 'react-markdown-editor-lite/lib/index.css';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
	emotionCache?: EmotionCache;
	initialSession: Session;
}

function getActiveTheme(themeMode: 'light' | 'dark') {
	return themeMode === 'light' ? lightTheme : darkTheme;
}

export const PREFERENCE_COOKIE_NAME = 'theme-preference';

export default function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache, initialSession }: AppProps & MyAppProps) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	const userSystemThemePreferenceDark = useMediaQuery('(prefers-color-scheme: dark)');

	const [activeTheme, setActiveTheme] = useState(lightTheme);
	const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

	const defaultInitialTheme = userSystemThemePreferenceDark ? 'dark' : 'light';
	const preferredTheme = cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME] ? cookieTheme[PREFERENCE_COOKIE_NAME] : defaultInitialTheme;

	const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(preferredTheme);

	const toggleTheme: React.MouseEventHandler<HTMLButtonElement> = () => {
		const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

		setSelectedTheme(desiredTheme);
		setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme);
	};

	useEffect(() => {
		if (cookieTheme['theme-preference'] === 'weak') {
			setActiveTheme(weakTheme);
		} else {
			setActiveTheme(getActiveTheme(selectedTheme));
		}
	}, [selectedTheme, cookieTheme]);

	const [toggle, setToggle] = useState<boolean>(false);

	const toggleSidebar: React.MouseEventHandler<HTMLButtonElement> = () => {
		setToggle(!toggle);
	};

	return (
		<CacheProvider value={emotionCache}>
			<StyledEngineProvider injectFirst>
				<ViewProvider>
				<ThemeProvider theme={activeTheme}>
					<CssBaseline />
					<SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
						<Component {...pageProps} toggle={toggle} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} selectedTheme={selectedTheme}/>
					</SessionContextProvider>
				</ThemeProvider>
				</ViewProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}
