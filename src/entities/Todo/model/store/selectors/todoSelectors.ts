import { createSelector } from '@reduxjs/toolkit'
import { selectTodos } from '../useTodosStore.ts'

//Мемоизированный селектор для количества выполненных тудушек
export const selectCompletedTodosCount = createSelector(
	[selectTodos],
	(todos) => todos.filter((todo) => todo.completed).length
)

//Мемоизированный селектор для количества невыполненных тудушек
export const selectUndoneTodosCount = createSelector(
	[selectTodos],
	(todos) => todos.filter((todo) => !todo.completed).length
)

//Мемоизированный селектор для общей статистики
export const selectTodosStats = createSelector([selectTodos], (todos) => ({
	total: todos.length,
	completed: todos.filter((todo) => todo.completed).length,
	undone: todos.filter((todo) => !todo.completed).length,
}))
