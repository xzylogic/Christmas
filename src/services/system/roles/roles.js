import request from '@/utils/request';

export async function fetchAccountList(params) {
  let query = '';
  if (params) {
    query = `?params`;
  }
  return request(`/api/accounts${query}`);
}

export async function toggleAccountState(params) {
  return request('/api/accounts/toggleState', {
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
