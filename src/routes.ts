import express from 'express'

// import PointController from './controllers/PointsController'
// import ItemController from './controllers/ItemsController'

// const pointController = new PointController()
// const itemController = new ItemController()

const routes = express.Router()
routes.use(express.json())

routes.get('/', (request, response) => {
  return response.json({ message: 'hello word' })
})

// routes.get('/items', itemController.index)

// routes.post('/points', pointController.create)

// routes.get('/points', pointController.index)

// routes.get('/points/:id', pointController.show)

// index => listagem, show => unico item, create, update, delete

export default routes
