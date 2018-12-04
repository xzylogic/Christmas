import request from '@/utils/request';

export async function fetchAccountListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/user/getUsers${query}`);
}

/**
 * 启用禁用用户账号
 * @param {*} userId 用户id
 * @param {*} enable 【0:禁用】【1:启用】
 */
export async function toggleAccountState(userId, enable) {
  return request(`/yilian-cloud-backend-api/user/enableUser?userId=${userId}&enable=${enable}`, {
    method: 'POST',
    body: {},
  });
}

export async function deleteAccount(params) {
  return request('/api/accounts/deleteAccount', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function resetAccountPassword(params) {
  return request('/api/accounts/resetPassword', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
