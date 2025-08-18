import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import App from './App'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
})

createRoot(document.getElementById('root')!).render(
	<SnackbarProvider>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</SnackbarProvider>
)
