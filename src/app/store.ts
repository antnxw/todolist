import { configureStore } from '@reduxjs/toolkit'
import { userStore } from '../entities/User/model/store/userStore.ts'
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'

export const store = configureStore({
	reducer: {
		userSlice: userStore.reducer,
	},
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
