import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import App from './App.tsx'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from './store.ts'

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
})

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<SnackbarProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</SnackbarProvider>
	</Provider>
)
