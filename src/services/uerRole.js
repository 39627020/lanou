import { request, config } from 'utils'

const { api } = config
const { userRole } = api

export async function queryMany (params) {
  return request({
    url: userRole,
    method: 'get',
    data: params,
  })
}
