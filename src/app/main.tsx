import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root')!).render(
	<>
		<CssBaseline />
		<App />
	</>
)
