import { request, config } from 'utils'
const { api } = config
const { testItem } = api

export async function queryMany (params) {

  return request({
    url: testItem.replace('/:id',""),
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url:testItem,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: testItem,
    method: 'patch',
    data: params,
  })
}
