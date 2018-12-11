import request from '@/utils/request';

export async function fetchRoleListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/role/getRoles${query}`);
}

export async function fetchRoleService(roleId) {
  return request(`/yilian-cloud-backend-api/role/getRoleMenus?roleId=${roleId}`);
}

export async function saveRoleService(postData) {
  return request('/yilian-cloud-backend-api/role/addRole', {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function toggleRoleStateService(roleId, enable) {
  return request(`/yilian-cloud-backend-api/role/enableRole?roleId=${roleId}&enable=${enable}`, {
    method: 'POST',
    body: {},
  });
}

export async function deleteRoleService(roleId) {
  return request(`/yilian-cloud-backend-api/role/deleteRole?roleId=${roleId}&deleted=1`, {
    method: 'POST',
    body: {},
  });
}
