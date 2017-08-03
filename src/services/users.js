import { request, config } from 'utils'

const { api } = config
const { user, userRegister } = api

export async function queryMany (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function removeMany (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'delete',
    data: params,
  })
}
export async function queryOneById (params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}
export async function removeOneById (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: userRegister,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
