import request from '@/utils/request';

export async function fetchAccountListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/user/getUsers${query}`);
}

export async function toggleAccountState(params) {
  return request('/api/accounts/toggleState', {
    method: 'POST',
    body: {
      ...params,
    },
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
