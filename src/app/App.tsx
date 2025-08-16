import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import {
	Button,
	Container,
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { SyntheticEvent, useState } from 'react'

function App() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setLoginFormName] = useState('login')

	const handleUserNameChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setUsername(e.currentTarget.value)
	}

	const handlePasswordChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPassword(e.currentTarget.value)
	}

	const handleLogin = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}
	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setLoginFormName(newAlignment)
	}

	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />

			<Container maxWidth={'sm'}>
				<ToggleButtonGroup
					disabled={loading}
					size={'small'}
					color="primary"
					value={loginFormName}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					fullWidth
					sx={{ marginBottom: 2 }}
				>
					<ToggleButton value="login">Login</ToggleButton>
					<ToggleButton value="register">Register</ToggleButton>
				</ToggleButtonGroup>
				{loginFormName === 'login' ? (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
							size={'small'}
							label="email"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							size={'small'}
							label="password"
							type="pssword"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<Button
							onClick={handleLogin}
							variant="contained"
							loadingPosition={'start'}
							loading={loading}
						>
							{loading ? 'Loading' : 'Login'}
						</Button>
					</Stack>
				) : (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
							size={'small'}
							label="email"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							size={'small'}
							label="password"
							type="pssword"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<Button
							onClick={handleLogin}
							variant="contained"
							loadingPosition={'start'}
							loading={loading}
						>
							{loading ? 'Loading' : 'Register'}
						</Button>
					</Stack>
				)}
			</Container>
		</>
	)
}

export default App
