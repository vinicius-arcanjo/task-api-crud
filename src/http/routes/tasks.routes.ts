import { FastifyInstance } from 'fastify'
import {
	InMemoryTasks,
	TaskProps,
} from '../../database/in-memory/in-memory.tasks'

const options = {
	schema: {
		body: {
			type: 'object',
			properties: {
				title: { type: 'string' },
				description: { type: 'string' },
			},
			required: ['title', 'description'],
		},
		response: {
			200: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					title: { type: 'string' },
					description: { type: 'string' },
					complete_at: { type: 'string' },
					created_at: { type: 'string' },
					updated_at: { type: 'string' },
				},
			},
		},
	},
}

export const tasksRoutes = async (app: FastifyInstance) => {
	app.get('/', async (request, response) => {
		response.send(await InMemoryTasks().getAll())
	})

	app.post('/', options, async (request, response) => {
		const { title, description } = request.body as TaskProps

		if (!title) {
			response.status(400).send({ error: 'Title is required' })
		}

		if (!description) {
			response.status(400).send({ error: 'Description is required' })
		}

		response.send(await InMemoryTasks().create({ title, description }))
	})

	app.put('/:id', async (request, response) => {
		const { id } = request.params as TaskProps
		const { title, description } = request.body as TaskProps

		response.send(await InMemoryTasks().update({ id, title, description }))
	})

	app.delete('/:id', async (request, response) => {
		const { id } = request.params as TaskProps

		response.send(await InMemoryTasks().deleteTask({ id }))
	})

	app.patch('/complete/:id', async (request, response) => {
    const { id } = request.params as TaskProps

    response.send(await InMemoryTasks().update({ id, complete_at: new Date() }))
	})
}
