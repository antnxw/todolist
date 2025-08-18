import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'
import {
	type MouseEvent,
	type SyntheticEvent,
	useState,
	type SetStateAction,
	type Dispatch,
} from 'react'
import { jwtDecode } from 'jwt-decode'
import type { UserType } from '../model/userType.ts'
import { rootApi } from '../../../shared/api/rootApi.ts'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>
}

const Auth = ({ setUser }: AuthProps) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setLoginFormName] = useState('login')
	const [showPassword, setShowPassword] = useState(false)

	const { enqueueSnackbar } = useSnackbar()

	const handleClearFields = () => {
		setEmail('')
		setPassword('')
	}

	const handleEmailChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasswordChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPassword(e.currentTarget.value)
	}

	const handleLogin = async () => {
		setLoading(true)
		try {
			const loginData = await rootApi.post<UserType>('/auth/login', {
				username: email,
				password: password,
			})

			const accessToken = loginData.data.access_token
			localStorage.setItem('access_token', accessToken)
			console.warn(jwtDecode(accessToken))
			setUser(loginData.data)
			enqueueSnackbar('Welcome back!', { variant: 'success' })
			handleClearFields()
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', {
				variant: 'error',
			})
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async () => {
		setLoading(true)
		try {
			const registerResponse = await fetch(
				'https://todos-be.vercel.app/auth/register',
				{
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({ username: email, password }),
					headers: { 'Content-Type': 'application/json' },
				}
			)

			if (!registerResponse.ok) {
				new Error('Username already exists')
			}
			handleClearFields()
		} catch (error) {
			alert(error)
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (
		_event: MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setLoginFormName(newAlignment)
	}
	const handleClickShowPassword = () => setShowPassword(!showPassword)

	return (
		<Container maxWidth={'sm'}>
			<ToggleButtonGroup
				color="primary"
				disabled={loading}
				value={loginFormName}
				exclusive
				onChange={handleChange}
				aria-label={'Login/Register'}
				sx={{ marginBottom: 2 }}
				fullWidth
			>
				<ToggleButton value="login" sx={{ borderRadius: '7px' }}>
					Login
				</ToggleButton>
				<ToggleButton value="register" sx={{ borderRadius: '7px' }}>
					Register
				</ToggleButton>
			</ToggleButtonGroup>
			{loginFormName === 'login' ? (
				<Stack spacing={2}>
					<TextField
						type={'email'}
						value={email}
						onChange={handleEmailChange}
						size={'small'}
						label={'Email'}
						disabled={loading}
						variant="filled"
						required
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<Lock />
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
								endAdornment: (
									<InputAdornment position={'end'}>
										<IconButton
											aria-label={
												showPassword ? 'hide password' : 'show password'
											}
											onClick={handleClickShowPassword}
											edge={'end'}
										/>
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
						value={email}
						onChange={handleEmailChange}
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
						onClick={handleRegister}
						variant="contained"
						loadingPosition={'start'}
						loading={loading}
					>
						{loading ? 'Loading' : 'Register'}
					</Button>
				</Stack>
			)}
		</Container>
	)
}
export default Auth
