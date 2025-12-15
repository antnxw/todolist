import { configureStore } from '@reduxjs/toolkit' //Импортируем функцию, которая создаёт Redux-хранилище
import { userStore } from '../entities/User/model/store/userStore.ts' //импорт слайса пользователя
import { useTodosStore } from '../entities/Todo/model/store/useTodosStore.ts' //импорт слайса тудушек
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'

export const store = configureStore({
	// Создай глобальное Redux-хранилище и настрой его
	reducer: {
		//передаю тебе список всех моих слайсов
		userSlice: userStore.reducer, //Добавь в хранилище редьюсер пользователя и назови этот кусок state — userSlice
		todosSlice: useTodosStore.reducer, //Добавь редьюсер todos, храни его в state.todosSlice
	},
})

//типизация
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

//Создаём удобные хуки чтобы потом в компонентах тебе было удобно писать код.
export const useAppDispatch: () => AppDispatch = useDispatch //54:00
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector //54:00
export const useAppStore: () => AppStore = useStore
