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
    url:testItem.replace('/:id',""),
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

export async function removeOneById (params) {
  return request({
    url: testItem,
    method: 'delete',
    data: params,
  })
}
export async function removeMany (params) {
  return request({
    url: testItem.replace('/:id',""),
    method: 'delete',
    data: params,
  })
}
