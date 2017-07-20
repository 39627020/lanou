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
  const username = localStorage.getItem(`${prefix}loginUsername`);
  return request({
    url: users + "/"+ username,
    method: 'get',
    data: params,
  })
}
