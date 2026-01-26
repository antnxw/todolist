import { useState } from 'react'
import { Button, FilledInput, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'

import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from './store.ts'
import { selectIsLoading, setIsLoading, setUser } from '../entities/User/model/store/userStore.ts'
import { rootApi } from '../shared/api/rootApi.ts'
import type { UserType } from '../entities/User/model/userType.ts'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const loading = useAppSelector(selectIsLoading)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const handleLogin = async () => {
		dispatch(setIsLoading(true))
		try {
			const { data } = await rootApi.post<UserType>('/auth/login', {
				username: email,
				password,
			})

			localStorage.setItem('access_token', data.access_token)
			dispatch(setUser(data))
			enqueueSnackbar('Welcome to Your Account!', { variant: 'success' })
			navigate('/')
		} catch (e) {
			const err = e as AxiosError<{ message: string }>
			enqueueSnackbar(err.response?.data.message || 'Unknown error', { variant: 'error' })
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	return (
		<Stack spacing={2}>
			<TextField
				type="email"
				label="Email"
				value={email}
				disabled={loading}
				onChange={(e) => setEmail(e.target.value)}
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
				type={showPassword ? 'text' : 'password'}
				label="Password"
				value={password}
				disabled={loading}
				onChange={(e) => setPassword(e.target.value)}
				variant="filled"
				slots={{ input: FilledInput }}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Lock />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
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
	)
}

export default Login
