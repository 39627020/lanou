import { request, config } from 'utils'
const { api ,prefix} = config
const { user, userLogout, userLogin } = api

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

export async function loginByLocalStorage (params) {
  const username = localStorage.getItem(`${prefix}loginUsername`);
  return request({
    url: user.replace('/:id',"") + "/"+ username,
    method: 'get',
    data: params,
  })
}
