import { useState } from 'react'
import Button from '@mui/material/Button'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import viteLogo from '../shared/assets/vite.svg'
import reactLogo from '../shared/assets/react.svg'
import githubLogo from '../shared/assets/github.svg'
import './App.css'
import AppBar from './AppBar.tsx'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<AppBar />
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo vite" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://github.com" target="_blank">
					<img src={githubLogo} className="logo github" alt="Github logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<Button variant={'contained'} onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default App
