import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create get a query genereted and result from this query genereted', async () => {

    const response = await request(app.server)
    .post('/ask')
    .send({
      question: 'Quais são os produtos que contem Ch no nome?',
      result: true
    })

    expect(response.statusCode).toEqual(201)
  })
})