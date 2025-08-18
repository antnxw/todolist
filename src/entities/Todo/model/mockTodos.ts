import type { TodoType } from './todoType.ts'

export const mockTodos: TodoType[] = [
	{
		_id: 'todo-1',
		title: 'Buy groceries',
		order: 1,
		completed: false,
		description: 'Milk, Bread, eggs',
		createdAt: '2025-08-18T08:00:00.000Z',
		updatedAt: '2025-08-18T08:00:00.000Z',
	},
	{
		_id: 'todo-2',
		title: 'Finish project report',
		order: 2,
		completed: false,
		description: 'Prepare slides and summary',
		createdAt: '2025-08-17T06:30:00.000Z',
		updatedAt: '2025-08-17T07:00:00.000Z',
	},
	{
		_id: 'todo-3',
		title: 'Gym workout',
		order: 3,
		completed: true,
		description: 'Legs and cardio day',
		createdAt: '2025-08-16T10:15:00.000Z',
		updatedAt: '2025-08-18T05:30:00.000Z',
	},
	{
		_id: 'todo-4',
		title: 'Call parents',
		order: 4,
		completed: false,
		description: 'Weekly check-in',
		createdAt: '2025-08-15T14:00:00.000Z',
		updatedAt: '2025-08-15T14:00:00.000Z',
	},
	{
		_id: 'todo-5',
		title: 'Read new book',
		order: 5,
		completed: false,
		description: 'Start reading Chapter 1',
		createdAt: '2025-08-10T20:00:00.000Z',
		updatedAt: '2025-08-12T21:00:00.000Z',
	},
]
