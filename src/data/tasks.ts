import type { Task } from '@/types'

export const initialTasks: Task[] = [
  { id: crypto.randomUUID(), title: 'Design login page', description: 'Create mockups for the new login and registration page', status: 'open' },
  { id: crypto.randomUUID(), title: 'Implement user authentication', description: 'Implement backend logic for user authentication', status: 'open' },
  { id: crypto.randomUUID(), title: 'Setup CI/CD pipeline', description: 'Configure CI/CD pipeline with GitHub Actions', status: 'open' },
  { id: crypto.randomUUID(), title: 'Write unit tests for API endpoints', description: 'Write comprehensive unit tests for all API endpoints', status: 'open' },
  { id: crypto.randomUUID(), title: 'Refactor codebase', description: 'Refactor codebase to improve readability and maintainability', status: 'open' },
  { id: crypto.randomUUID(), title: 'Optimize database queries', description: 'Optimize slow-performing database queries', status: 'in-progress' },
  { id: crypto.randomUUID(), title: 'Implement role-based access control', description: 'Implement RBAC to restrict access to certain features', status: 'in-progress' },
  { id: crypto.randomUUID(), title: 'Write documentation for API', description: 'Write comprehensive documentation for the API', status: 'in-progress' },
  { id: crypto.randomUUID(), title: 'Deploy application to production', description: 'Deploy the application to the production environment', status: 'in-progress' },
  { id: crypto.randomUUID(), title: 'Monitor application performance', description: 'Monitor application performance using Prometheus and Grafana', status: 'completed' },
  { id: crypto.randomUUID(), title: 'Fix critical bugs', description: 'Fix all critical bugs reported by users', status: 'completed' },
  { id: crypto.randomUUID(), title: 'Conduct security audit', description: 'Conduct a thorough security audit of the application', status: 'completed' },
  { id: crypto.randomUUID(), title: 'Implement two-factor authentication', description: 'Implement 2FA for enhanced security', status: 'completed' },
  { id: crypto.randomUUID(), title: 'Upgrade dependencies', description: 'Upgrade all dependencies to the latest versions', status: 'completed' },
  { id: crypto.randomUUID(), title: 'Implement logging and error tracking', description: 'Implement logging and error tracking using Sentry', status: 'completed' },
  { id: crypto.randomUUID(), title: 'Optimize images', description: 'Optimize images to reduce page load time', status: 'completed' },
]
