import { request, config } from '../utils'

const { api } = config
const { userRegister } = api

export async function register (params) {
  return request({
    url: userRegister,
    method: 'post',
    data: params,
  })
}
