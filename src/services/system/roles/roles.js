import request from '@/utils/request';

export async function fetchRoleListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/role/getRoles${query}`);
}

export async function toggleRoleState(params) {
  return request('/api/accounts/toggleState', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteRole(params) {
  return request('/api/accounts/resetPassword', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
