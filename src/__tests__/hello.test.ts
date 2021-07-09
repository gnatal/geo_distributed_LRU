import request from 'supertest'
import server from '../app'

describe('loading express', function () {
  it('should get the hello word', async () => {
    const res = await request(server).get('/')

    expect(res.statusCode).toEqual(200)
  })

  it('should get a cached resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: true })
  })

  it('should get a non cached resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })

  it('should create a new resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })

  it('should update a resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })

  it('should delete a resource', async () => {
    const response = await request(server).get('/getResource')

    expect(response.body).toBe({ data: 'true', cached: false })
  })
})
