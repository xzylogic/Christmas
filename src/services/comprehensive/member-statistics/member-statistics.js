import request from '@/utils/request';

export async function fetchMemberFollowList(params) {
  let query = '';
  if (params) {
    query += `?${params}`;
  }
  return request(`/yilian-cloud-backend-api/user/getUsers${query}`);
}

export async function fetchMemberRegisterList(params) {
  let query = ``;
  if (params) {
    query += `?${params}`;
  }
  return request(`/yilian-cloud-backend-api/user/getUsers${query}`);
}
