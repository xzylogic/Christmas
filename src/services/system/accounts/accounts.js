import request from '@/utils/request';

export async function fetchAccountListService() {
  // let query = '';
  // if (params) {
  //   query = `?params`;
  // }
  return request(`/api/accountList`);
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
