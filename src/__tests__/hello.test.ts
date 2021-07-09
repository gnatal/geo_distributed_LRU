import request from 'supertest'
import server from '../app'

describe('loading express', function () {
  it('should create a new post', async () => {
    const res = await request(server).get('/')

    expect(res.statusCode).toEqual(200)
  })
})
