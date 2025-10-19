import type { statuses } from '@/data/tasks'

export type Task = { id: string, title: string, description: string, status: TaskStatus }

export type TaskStatus = (typeof statuses)[number]['status']
