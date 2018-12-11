import request from '@/utils/request';

/**
 * 获取账号列表
 * @param {*} params 查询参数
 * @param {*} page 页码
 * @param {*} size 每页个数
 */
export async function fetchAccountListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/user/getUsers${query}`);
}

/**
 * 获取账号详情
 * @param {*} userId 用户id
 */
export async function fetchAccountDetailService(userId) {
  return request(`/yilian-cloud-backend-api/user/findUserById?userId=${userId}`);
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
 * 删除账号
 * @param {*} userId 用户id
 */
export async function deleteAccountService(userId) {
  return request(`/yilian-cloud-backend-api/user/deleteUser?userId=${userId}&deleted=true`, {
    method: 'POST',
    body: {},
  });
}

/**
 * 重置账号密码
 * @param {*} userId 用户id
 */
export async function resetAccountPasswordService(userId) {
  return request(`/yilian-cloud-backend-api/user/resetPassword?userId=${userId}`, {
    method: 'POST',
    body: {},
  });
}

/**
 * 获取角色列表
 */
export async function fetchAllRolesService() {
  return request(`/yilian-cloud-backend-api/role/getAllRoles`);
}

/**
 * 新增/编辑账号
 * @param {*} data 账号实体
 */
export async function saveAccountService(data) {
  return request(`/yilian-cloud-backend-api/user/register`, {
    method: 'POST',
    body: { ...data },
  });
}
