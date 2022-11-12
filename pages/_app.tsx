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

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	initialSession: Session;
}

function getActiveTheme(themeMode: 'light' | 'dark') {
	return themeMode === 'light' ? lightTheme : darkTheme;
}

const PREFERENCE_COOKIE_NAME = 'theme-preference';

export default function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, initialSession, pageProps } = props;
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	const userSystemThemePreferenceDark = useMediaQuery('(prefers-color-scheme: dark)');

	const [activeTheme, setActiveTheme] = useState(lightTheme);
	const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

	const defaultInitialTheme = userSystemThemePreferenceDark ? 'dark' : 'light';
	const preferredTheme = cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME] ? cookieTheme[PREFERENCE_COOKIE_NAME] : defaultInitialTheme;

	const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(preferredTheme);

	const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = () => {
		const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

		setSelectedTheme(desiredTheme);
		setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme);
	};

	useEffect(() => {
		setActiveTheme(getActiveTheme(selectedTheme));
	}, [selectedTheme]);

	return (
		<CacheProvider value={emotionCache}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={activeTheme}>
					<CssBaseline />
					<SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
						<Component {...pageProps} toggleTheme={toggleTheme} />
					</SessionContextProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}
