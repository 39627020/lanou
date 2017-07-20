import { request, config } from 'utils'
const { api ,prefix} = config
const { users, userLogout, userLogin } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  localStorage.setItem(`${prefix}loginToken`,"")
  localStorage.setItem(`${prefix}loginUsername`,"")
  return {
    success:true,
  };
}

export async function query (params) {
  return request({
    url: users+ "/"+localStorage.getItem(`${prefix}loginUsername`),
    method: 'get',
    data: params,
  })
}
