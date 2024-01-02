import Fastify from 'fastify'
import { tasksRoutes } from './routes/tasks.routes'

const app = Fastify({
	logger: true,
})

app.register(tasksRoutes, { prefix: '/tasks' })

app.addHook('onRequest', (request, reply, done) => {
	console.time('Timer')

  done()
})

app.addHook('onResponse', (request, reply, done) => {
	console.timeEnd('Timer')

  done()
})

app.listen({ port: 3000 }, (err, address) => {
	if (err) throw err
})
