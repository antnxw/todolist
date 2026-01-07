import { CssBaseline } from '@mui/material' //сбрасываем стили браузера, делая их везде одинаковыми
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes.tsx'
import ErrorHandler from '../entities/App/ui/ErrorHandler.tsx'

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
})

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorHandler>
			<Provider store={store}>
				<SnackbarProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<AppRoutes />
					</ThemeProvider>
				</SnackbarProvider>
			</Provider>
		</ErrorHandler>
	</BrowserRouter>
)
