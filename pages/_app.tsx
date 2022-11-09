import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache, ThemeContext } from '@emotion/react';
import theme from '../design/theme/theme';
import createEmotionCache from '../design/theme/createEmotionCache';
import '@fontsource/lexend-deca';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { StyledEngineProvider } from '@mui/material/styles';
import { AllColors, colors } from '../design/theme/themeColors';
import { useContext, useState } from 'react';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	initialSession: Session;
}

export default function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, initialSession, pageProps } = props;
	const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());
	const [themeColor, setThemeColor] = useState<AllColors>(colors.dark);

	return (
		<CacheProvider value={emotionCache}>
			<StyledEngineProvider injectFirst>
				<ThemeContext.Provider value={{ themeColor, setThemeColor }}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
							<Component {...pageProps} />
						</SessionContextProvider>
					</ThemeProvider>
				</ThemeContext.Provider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}
