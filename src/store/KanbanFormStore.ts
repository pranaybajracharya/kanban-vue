import type { TaskStatus } from '@/types'
import { reactive } from 'vue'

export const kanbanFormStore = reactive({
  open: false,
  id: undefined as string | undefined,
  title: '',
  description: '',
  status: 'open' as TaskStatus,
  setOpen (open: boolean) {
    this.open = open
  },
  setValue ({ id, title, description, status }: { id?: string, title: string, description: string, status: TaskStatus }) {
    this.id = id
    this.title = title
    this.description = description
    this.status = status
  },
  reset () {
    this.id = undefined
    this.title = ''
    this.description = ''
    this.status = 'open'
  },
})
