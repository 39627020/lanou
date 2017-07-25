import { request, config } from 'utils'
const { api } = config
const { exam } = api

export async function query (params) {

  return request({
    url: exam.replace('/:id',""),
    method: 'get',
    data: params,
  })
}
