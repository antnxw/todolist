import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Navigate } from 'react-router'
import { useState } from 'react'
import { useAppSelector } from '../../../app/store'
import { selectUser, selectIsLoading } from '../model/store/userStore'
import Register from '../../../app/Register'
import Login from '../../../app/Login'

const Auth = () => {
	const [form, setForm] = useState<'login' | 'register'>('login')
	const user = useAppSelector(selectUser)
	const loading = useAppSelector(selectIsLoading)

	if (user) {
		return <Navigate to="/" />
	}

	return (
		<Container maxWidth="sm">
			<ToggleButtonGroup
				fullWidth
				exclusive
				value={form}
				disabled={loading}
				onChange={(_, value) => value && setForm(value)}
				sx={{ mb: 2 }}
			>
				<ToggleButton value="login">Login</ToggleButton>
				<ToggleButton value="register">Register</ToggleButton>
			</ToggleButtonGroup>

			{form === 'login' ? <Login /> : <Register onSuccess={() => setForm('login')} />}
		</Container>
	)
}

export default Auth
