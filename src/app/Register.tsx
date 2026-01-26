import { useState } from 'react'
import { Button, FilledInput, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'

import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from './store.ts'
import { selectIsLoading, setIsLoading } from '../entities/User/model/store/userStore.ts'
import { rootApi } from '../shared/api/rootApi.ts'

type Props = {
	onSuccess: () => void
}

const Register = ({ onSuccess }: Props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const loading = useAppSelector(selectIsLoading)
	const dispatch = useAppDispatch()
	const { enqueueSnackbar } = useSnackbar()

	const handleRegister = async () => {
		dispatch(setIsLoading(true))
		try {
			await rootApi.post('/auth/register', {
				username: email,
				password,
			})

			enqueueSnackbar('Registration successful!', { variant: 'success' })
			onSuccess()
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

			<Button onClick={handleRegister} variant="contained" disabled={loading}>
				{loading ? 'Loading...' : 'Register'}
			</Button>
		</Stack>
	)
}

export default Register
