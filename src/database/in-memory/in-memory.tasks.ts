export type TaskProps = {
	id?: number
	title?: string
	description?: string
	complete_at?: Date | null
	created_at?: Date
	updated_at?: Date
}

const tasks: TaskProps[] = []

export const InMemoryTasks = () => {
	const getAll = async () => {
		return tasks
	}

	const create = async ({ title, description }: TaskProps) => {
		const task: TaskProps = {
			id: tasks.length + 1,
			title,
			description,
			complete_at: null,
			created_at: new Date(),
			updated_at: new Date(),
		}

		tasks.push(task)

		return task
	}

	const update = async ({ id, title, description, complete_at }: TaskProps) => {
    const task = tasks.find((task) => task.id === Number(id))

    console.log(id)

    if (!task) {
      throw new Error('Task not found')
    }

		if (title) {
			task.title = title
		}

		if (description) {
			task.description = description
		}

    if (complete_at) {
      task.complete_at = complete_at
    }

		return task
	}

	const deleteTask = async ({id}: TaskProps) => {
		const index = tasks.findIndex((task) => task.id === Number(id))
		tasks.splice(index, 1)
		return true
	}

	return {
		getAll,
		create,
		update,
		deleteTask,
	}
}
