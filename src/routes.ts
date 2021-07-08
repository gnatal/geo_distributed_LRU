import express from 'express'
import InstanceController from './controllers/InstanceController'
// import PointController from './controllers/PointsController'
// import ItemController from './controllers/ItemsController'

const instanceController = new InstanceController()
// const itemController = new ItemController()

const routes = express.Router()
routes.use(express.json())

routes.get('/', (request, response) => {
  return response.json({ message: 'hello word' })
})

routes.get('/getInstances/:region', instanceController.index)
routes.post('/getInstances/:region', instanceController.index)
routes.put('/getInstances/:region', instanceController.index)
routes.delete('/getInstances/:region', instanceController.index)

export default routes
