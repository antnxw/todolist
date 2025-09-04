import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Stack,
	Typography,
	Box,
	TextField,
	IconButton,
} from '@mui/material'
import { Edit, Save, Cancel } from '@mui/icons-material'
import type { TodoType } from '../model/todoType.ts'
import { mockTodos } from '../model/mockTodos.ts'
import { useState } from 'react'
import { useSnackbar } from 'notistack'

type TodoProps = {
	todo: TodoType
	setTodo: (todo: TodoType) => void
}

const Todo = ({ todo, setTodo }: TodoProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editTitle, setEditTitle] = useState(todo.title)
	const [editDescription, setEditDescription] = useState(todo.description || '')
	const { enqueueSnackbar } = useSnackbar()

	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}

	const handleDoubleClick = () => {
		setIsEditing(true)
	}

	const handleSave = () => {
		if (!editTitle.trim()) {
			enqueueSnackbar('Заголовок не может быть пустым', { variant: 'error' })
			return
		}

		const updatedTodo = {
			...todo,
			title: editTitle.trim(),
			description: editDescription.trim(),
			updatedAt: new Date().toISOString(),
		}

		setTodo(updatedTodo)
		setIsEditing(false)
		enqueueSnackbar('Задача успешно обновлена!', { variant: 'success' })
	}

	const handleCancel = () => {
		setEditTitle(todo.title)
		setEditDescription(todo.description || '')
		setIsEditing(false)
	}

	return (
		<Card
			variant="outlined"
			sx={{
				maxWidth: 250,
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				height: 300, // Фиксированная высота карточки
			}}
			onDoubleClick={handleDoubleClick}
		>
			<CardContent
				sx={{
					flexGrow: 1, // Контент занимает все available space
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{isEditing ? (
					// Режим редактирования
					<Box sx={{ flexGrow: 1 }}>
						<TextField
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							size="small"
							fullWidth
							sx={{ mb: 1 }}
							autoFocus
						/>
						<TextField
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value)}
							size="small"
							fullWidth
							multiline
							rows={3}
							placeholder="Описание (необязательно)"
						/>
					</Box>
				) : (
					// Режим просмотра
					<Box sx={{ flexGrow: 1 }}>
						<Typography
							gutterBottom
							sx={{
								color: 'text.secondary',
								fontSize: 14,
								wordBreak: 'break-word',
							}}
						>
							{todo.title}
						</Typography>
						{todo.description && (
							<Typography
								variant="body2"
								sx={{
									mb: 2,
									wordBreak: 'break-word',
									flexGrow: 1,
								}}
							>
								{todo.description}
							</Typography>
						)}
					</Box>
				)}

				{/* Даты создания и обновления */}
				<Box sx={{ mt: 'auto' }}>
					{' '}
					{/* mt: 'auto' прижать даты к низу */}
					<Typography
						variant="caption"
						color="textSecondary"
						display="block"
						sx={{ fontSize: '0.7rem' }}
					>
						Created: {new Date(todo.createdAt).toLocaleString()}
					</Typography>
					{todo.createdAt !== todo.updatedAt && (
						<Typography
							variant="caption"
							color="textSecondary"
							display="block"
							sx={{ fontSize: '0.7rem' }}
						>
							Updated: {new Date(todo.updatedAt).toLocaleString()}
						</Typography>
					)}
				</Box>
			</CardContent>

			<CardActions
				sx={{
					pt: 0, // Убираем отступ сверху
					minHeight: '48px', // Фиксированная высота для действий
				}}
			>
				{isEditing ? (
					// Кнопки в режиме редактирования
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							width: '100%',
							justifyContent: 'center',
						}}
					>
						<IconButton size="small" onClick={handleSave} color="primary" title="Сохранить">
							<Save />
						</IconButton>
						<IconButton size="small" onClick={handleCancel} color="error" title="Отменить">
							<Cancel />
						</IconButton>
					</Box>
				) : (
					// Кнопки в режиме просмотра
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							width: '100%',
						}}
					>
						<Checkbox
							checked={todo.completed}
							onClick={handleCheckClick}
							title="Отметить как выполненное"
							sx={{ flexShrink: 0 }}
						/>
						<IconButton
							size="small"
							onClick={() => setIsEditing(true)}
							title="Редактировать"
							sx={{
								ml: 'auto',
								flexShrink: 0,
							}}
						>
							<Edit />
						</IconButton>
					</Box>
				)}
			</CardActions>
		</Card>
	)
}

const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos)

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id == todo._id) {
				return todo
			}
			return t
		})
		setTodos(updatedTodos)
	}

	return (
		<Stack flexWrap={'wrap'} spacing={2} direction={'row'}>
			{todos.map((todo) => {
				return <Todo todo={todo} key={todo._id} setTodo={setTodo} />
			})}
		</Stack>
	)
}

export default Todos
