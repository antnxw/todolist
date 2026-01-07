import React, { type SyntheticEvent, useState } from 'react'
import {
	Button,
	Container,
	FilledInput,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import type { UserType } from '../model/userType.ts'
import { rootApi } from '../../../shared/api/rootApi.ts'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { selectIsLoading, selectUser, setIsLoading, setUser } from '../model/store/userStore.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { Navigate, useNavigate } from 'react-router'

const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginFormName, setLoginFormName] = useState('login')
	const [showPassword, setShowPassword] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const loading = useAppSelector(selectIsLoading)
	const user = useAppSelector(selectUser)

	//Если пользователь уже авторизован – сразу редирекитим на главную
	if (user) {
		return <Navigate to="/" replace />
	}

	const handleClearFields = () => {
		setEmail('')
		setPassword('')
	}

	const handleEmailChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}

	const handleLogin = async () => {
		dispatch(setIsLoading(true))
		try {
			const loginData = await rootApi.post<UserType>('/auth/login', {
				username: email,
				password: password,
			})

			const accessToken = loginData.data.access_token
			localStorage.setItem('access_token', accessToken)
			dispatch(setUser(loginData.data))
			enqueueSnackbar('Welcome to Your Account!', { variant: 'success' })
			handleClearFields()

			//Редирект только после успешного логина
			navigate('/')
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', {
				variant: 'error',
			})
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	const handleRegister = async () => {
		dispatch(setIsLoading(true))
		try {
			await rootApi.post<UserType>('/auth/register', {
				username: email,
				password: password,
			})
			enqueueSnackbar('Registration successful!', { variant: 'success' })
			handleClearFields()

			// После регистрации переключаемся на форму логина
			setLoginFormName('login')
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', {
				variant: 'error',
			})
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment)
	}
	const handleClickShowPassword = () => setShowPassword(!showPassword)

	//код с урока 14.ErrorBoundary

	// const Auth = () => {
	// 	const [loginFormName, setLoginFormName] = useState('login')
	//  const [error, setError] = useState(false)
	// 	const user = useAppSelector(selectUser)
	// 	const loading = useAppSelector(selectIsLoading)
	//
	// 	const navigate = useNavigate()
	//
	// 	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
	// 		setLoginFormName(newAlignment)
	// 		navigate(`/auth/${newAlignment}`)
	// 	}
	//
	// 	if (user) {
	// 		return <Navigate to={'/'} />
	// 	}
	//  if(error) {
	//   throw new Error('Error')
	// }

	return (
		<Container maxWidth={'sm'}>
			<ToggleButtonGroup
				color={'primary'}
				disabled={loading}
				value={loginFormName}
				exclusive
				onChange={handleChange}
				aria-label={'Login/Register'}
				sx={{ marginBottom: 2 }}
				fullWidth
			>
				<ToggleButton value={'login'} sx={{ borderRadius: '7px' }}>
					Login
				</ToggleButton>
				<ToggleButton value={'register'} sx={{ borderRadius: '7px' }}>
					Register
				</ToggleButton>
			</ToggleButtonGroup>
			<Button variant={'contained'} color={'error'} fullWidth onClick={() => setError(true)}>
				ERROR
			</Button>

			{loginFormName === 'login' ? (
				<Stack spacing={2}>
					<TextField
						type={'email'}
						value={email}
						onChange={handleEmailChange}
						size={'small'}
						label={'Email'}
						disabled={loading}
						variant={'filled'}
						required
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<AccountCircle />
									</InputAdornment>
								),
							},
						}}
					/>
					<TextField
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={handlePasswordChange}
						size={'small'}
						label={'Password'}
						disabled={loading}
						variant={'filled'}
						required
						slots={{
							input: FilledInput,
						}}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<Lock />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position={'end'}>
										<IconButton
											aria-label={showPassword ? 'hide password' : 'show password'}
											onClick={handleClickShowPassword}
											edge={'end'}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
					<Button onClick={handleLogin} variant="contained" disabled={loading}>
						{loading ? 'Loading...' : 'Login'}
					</Button>
				</Stack>
			) : (
				<Stack spacing={2}>
					<TextField
						type={'email'}
						value={email}
						onChange={handleEmailChange}
						size={'small'}
						label={'Email'}
						disabled={loading}
						variant={'filled'}
						required
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<AccountCircle />
									</InputAdornment>
								),
							},
						}}
					/>
					<TextField
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={handlePasswordChange}
						size={'small'}
						label={'Password'}
						disabled={loading}
						variant={'filled'}
						required
						slots={{
							input: FilledInput,
						}}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<Lock />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position={'end'}>
										<IconButton
											aria-label={showPassword ? 'hide password' : 'show password'}
											onClick={handleClickShowPassword}
											edge={'end'}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
					<Button onClick={handleRegister} variant={'contained'} disabled={loading}>
						{loading ? 'Loading...' : 'Register'}
					</Button>
				</Stack>
			)}
		</Container>
	)
}

export default Auth
