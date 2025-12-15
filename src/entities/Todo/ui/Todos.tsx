import { Button, Container, Input, Stack } from '@mui/material'
import { addTodo, selectTodos, setTodos } from '../model/store/useTodosStore.ts'
import { Todo } from './Todo.tsx'
import { type ChangeEvent, useEffect, useState } from 'react'
import type { TodoType } from '../model/todoType.ts'
import { store, useAppDispatch, useAppSelector } from '../../../app/store.ts'

const Todos = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const todos = useAppSelector(selectTodos)
	const state = useAppSelector((state) => state)
	const dispatch = useAppDispatch()
	useEffect(() => {
		console.log(state)
		console.log('getState', store.getState())
	}, [])

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo
			}
			return t
		})
		dispatch(setTodos(updatedTodos))
	}

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleAddTodo = () => {
		const newTodo: TodoType = {
			_id: Date.now().toString(),
			title: newTodoTitle,
			description: newTodoDescription,
			completed: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			order: todos.length + 1,
		}
		dispatch(addTodo(newTodo))
	}

	return (
		<Container>
			<Input
				placeholder={'title'}
				value={newTodoTitle}
				onChange={handleTitleChange}
			/>
			<Input
				placeholder={'description'}
				value={newTodoDescription}
				onChange={handleDescriptionChange}
			/>
			<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>
			<Stack spacing={2} direction="row" flexWrap="wrap">
				{todos.map((todo) => {
					return <Todo todo={todo} key={todo._id} setTodo={setTodo} />
				})}
			</Stack>
		</Container>
	)
}

export default Todos
