import { createSlice } from '@reduxjs/toolkit'
import type { UserType } from '../userType.ts'

type UserStore = {
	user: null | UserType
	isLoading: boolean
}

const initialState: UserStore = {
	user: null,
	isLoading: false,
}

export const userStore = createSlice({
	//Это функция, которая ждёт объект-настройку
	name: 'userSlice', //Назови этот кусок стора пользовательским слайсом
	initialState, //Начальное состояние — вот этот объект
	reducers: {
		//reducers — это функции, которые обновляют state
		setUser: (state, action) => {
			//setUser: положи в state.user данные из action.payload
			state.user = action.payload
		},
		removeUser: (state) => {
			//removeUser: положи null в state.user
			state.user = null
		},
		setIsLoading: (state, action) => {
			//setIsLoading: запиши новое значение загрузки
			state.isLoading = action.payload
		},
	},
	selectors: {
		//selectors — функции, которые достают нужные значения из state
		selectUser: (state: UserStore) => {
			//selectUser → верни state.user
			return state.user
		},
		selectIsLoading: (state: UserStore) => state.isLoading,
	}, //selectIsLoading → верни state.isLoading
})

export const { setUser, removeUser, setIsLoading } = userStore.actions
export const { selectUser, selectIsLoading } = userStore.selectors
