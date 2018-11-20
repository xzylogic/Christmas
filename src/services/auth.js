import request from '@/utils/request';

export async function login(username, password) {
  return request(`/yilian-cloud-backend-api/user/login?username=${username}&password=${password}`, {
    method: 'POST',
    body: {},
  });
}

export async function resetPassword(id) {
  return request('/yilian-cloud-backend-api/user/resetPwd', {
    method: 'POST',
    body: {
      ...id,
    },
  });
}
