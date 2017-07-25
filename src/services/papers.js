import { request, config } from 'utils'
const { api } = config
const { paper } = api

export async function query (params) {

  return request({
    url: paper.replace('/:id',""),
    method: 'get',
    data: params,
  })
}
