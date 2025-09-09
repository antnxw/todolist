import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Typography,
	Box,
	TextField,
	IconButton,
} from '@mui/material'
import { Edit, Save, Cancel, Delete } from '@mui/icons-material' // Delete иконка
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import type { TodoType } from '../model/todoType.ts'
import { useTodosStore } from '../model/store/useTodosStore.ts'

type TodoProps = {
	todo: TodoType
	setTodo?: (todo: TodoType) => void
}

export const Todo = ({ todo, setTodo }: TodoProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editTitle, setEditTitle] = useState(todo.title)
	const [editDescription, setEditDescription] = useState(todo.description || '')
	const { enqueueSnackbar } = useSnackbar()
	const { deleteTodo } = useTodosStore() // удалить туду

	const handleCheckClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed })
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

		setTodo?.(updatedTodo)
		setIsEditing(false)
		enqueueSnackbar('Задача успешно обновлена!', { variant: 'success' })
	}

	const handleCancel = () => {
		setEditTitle(todo.title)
		setEditDescription(todo.description || '')
		setIsEditing(false)
	}

	// функция удаления
	const handleDelete = () => {
		if (window.confirm('Удалить эту задачу?')) {
			deleteTodo(todo._id)
			enqueueSnackbar('Задача удалена!', { variant: 'info' })
		}
	}

	return (
		<Card
			variant="outlined"
			sx={{
				maxWidth: 250,
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				height: 300,
			}}
			onDoubleClick={handleDoubleClick}
		>
			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{isEditing ? (
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

				<Box sx={{ mt: 'auto' }}>
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
					pt: 0,
					minHeight: '48px',
				}}
			>
				{isEditing ? (
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							width: '100%',
							justifyContent: 'center',
						}}
					>
						<IconButton
							size="small"
							onClick={handleSave}
							color="primary"
							title="Сохранить"
						>
							<Save />
						</IconButton>
						<IconButton
							size="small"
							onClick={handleCancel}
							color="error"
							title="Отменить"
						>
							<Cancel />
						</IconButton>
					</Box>
				) : (
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
							sx={{ flexShrink: 0 }}
						>
							<Edit />
						</IconButton>

						{/* кнопка удаления */}
						<IconButton
							size="small"
							onClick={handleDelete}
							title="Удалить"
							color="error"
							sx={{ flexShrink: 0 }}
						>
							<Delete />
						</IconButton>
					</Box>
				)}
			</CardActions>
		</Card>
	)
}
