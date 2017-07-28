import { request, config } from 'utils'
const { api } = config
const { subject } = api

export async function queryMany (params) {

  return request({
    url: subject.replace('/:id',""),
    method: 'get',
    data: params,
  })
}
