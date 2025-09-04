import { rootApi } from '../../../shared/api/rootApi.ts'
import type { UserType } from '../model/userType.ts'
import type { AxiosError } from 'axios'

export const loginUser = async (email: string, password: string): Promise<UserType | null> => {
	try {
		const response = await rootApi.post<UserType>('/auth/login', {
			username: email,
			password: password,
		})
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError<{ message: string }>
		throw new Error(axiosError.response?.data.message || 'Login failed')
	}
}

export const registerUser = async (email: string, password: string): Promise<UserType | null> => {
	try {
		const response = await rootApi.post<UserType>('/auth/register', {
			username: email,
			password: password,
		})
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError<{ message: string }>
		throw new Error(axiosError.response?.data.message || 'Registration failed')
	}
}
