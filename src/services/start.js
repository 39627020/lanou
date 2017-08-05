import { request, config } from '../utils'

const { api } = config
const { startComplete,startStart, startEnd,start,} = api

/**
 * 上传考试结果
 * @param params
 * @returns {Promise.<*>}
 */
export async function completeExam (params) {
  return request({
    url:startComplete,
    method: 'post',
    data: params,
  })
}
export async function queryOneByExamId (params) {
  return request({
    url:start,
    method: 'get',
    data: params,
  })
}
export async function startExam (params) {
  return request({
    url:startStart,
    method: 'post',
    data: params,
  })
}
export async function endExam (params) {
  return request({
    url:startEnd,
    method: 'post',
    data: params,
  })
}
