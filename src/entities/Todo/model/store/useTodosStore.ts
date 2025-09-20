import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockTodos } from '../mockTodos'
import type { TodoType } from '../todoType'

type TodosState = {
	todos: TodoType[]
}

const initialState: TodosState = {
	todos: mockTodos,
}

export const useTodosStore = createSlice({
	name: 'todosSlice',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<TodoType>) => {
			state.todos.unshift(action.payload)
		},
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			state.todos = action.payload
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((todo) => todo._id !== action.payload)
		},
	},
	selectors: {
		selectTodos: (state: TodosState) => state.todos,
	},
})

export const { addTodo, setTodos, deleteTodo } = useTodosStore.actions
export const { selectTodos } = useTodosStore.selectors
