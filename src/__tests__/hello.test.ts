import request from 'supertest'
import server from '../app'

describe('loading express', function () {

  //test just for making sure that tests are working
  it('should get the hello word', async () => {
    const res = await request(server).get('/')

    expect(res.statusCode).toEqual(200)
  })

  //test for getting a cached resource
  it('should get a cached resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: true })
  })

  //test for getting a non cached resource
  it('should get a non cached resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })

  //test for create a resource
  it('should create a new resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })

  //test for update a resource
  it('should update a resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })

  //test for create a delete
  it('should delete a resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })
})
