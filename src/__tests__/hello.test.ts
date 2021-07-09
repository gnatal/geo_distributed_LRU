import request from 'supertest'
import server from '../app'

jest.setTimeout(100000)

describe('loading express', function () {

  //test just for making sure that tests are working
  it('should get the hello word', async () => {
    const res = await request(server).get('/')

    expect(res.statusCode).toEqual(200)
  })

  //test for getting a cached resource
  it('should get a non cached resource', async () => {
    const response = await request(server).get('/getResource').send({
      path: "user",
      latitude: "2",
      longitude: "5"
    })

    expect(response.body).toMatchObject({
      freshResource: {
        id: 4,
        path: "user",
        data: "jorges",
      }, wasCached: false
    })
  })

  it('should get a cached resource', async () => {
    const response = await request(server).get('/getResource').send({
      path: "cached_source",
      latitude: "2",
      longitude: "5"
    })

    expect(response.body).toMatchObject({
      resource: {
        id: 1,
        path: "cached_source",
        data: "first cached item",
      }, wasCached: true
    })
  })

  //test for getting a non cached resource

  //test for create a resource
  it('should create a new resource', async () => {
    const response = await request(server).post('/resource').send({ path: "creators", data: "rick sanches" })

    expect(response.body).toHaveProperty("queue")
  })

  // //test for update a resource
  // it('should update a resource', async () => {
  //   const response = await request(server).get('/getResource').send({})

  //   expect(response.body).toBe({ data: 'true', cached: false })
  // })

  // //test for create a delete
  // it('should delete a resource', async () => {
  //   const response = await request(server).get('/getResource').send({})

  //   expect(response.body).toBe({ data: 'true', cached: false })
  // })
})
