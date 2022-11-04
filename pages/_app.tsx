import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../design/theme/theme';
import createEmotionCache from '../design/theme/createEmotionCache';
import '@fontsource/lexend-deca';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { StyledEngineProvider } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	initialSession: Session;
}

export default function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, initialSession, pageProps } = props;
	const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
						<Component {...pageProps} />
					</SessionContextProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}
