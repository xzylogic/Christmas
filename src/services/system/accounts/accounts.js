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
export async function toggleAccountStateService(userId, enable) {
  return request(`/yilian-cloud-backend-api/user/enableUser?userId=${userId}&enable=${enable}`, {
    method: 'POST',
    body: {},
  });
}

/**
 *
 * @param {*} userId 用户id
 */
export async function deleteAccountService(userId) {
  return request(`/yilian-cloud-backend-api/user/deleteUser?userId=${userId}&deleted=true`, {
    method: 'POST',
    body: {},
  });
}

export async function resetAccountPasswordService(userId) {
  return request(`/yilian-cloud-backend-api/user/resetPassword?userId=${userId}`, {
    method: 'POST',
    body: {},
  });
}

export async function fetchAllRolesService() {
  return request(`/yilian-cloud-backend-api/role/getAllRoles`);
}
