import request from '@/utils/request';

export async function fetchGroupPerformanceService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/performance/group/all${query}`);
}

export async function fetchGroupPerformanceDetailService(way, params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  let req = '';
  if (params) {
    query += `${params}`;
  }
  switch (way) {
    case 'day':
      req = request(`/yilian-cloud-backend-api/performance/group/day${query}`);
      break;
    case 'week':
      req = request(`/yilian-cloud-backend-api/performance/group/week${query}`);
      break;
    case 'month':
      req = request(`/yilian-cloud-backend-api/performance/group/month${query}`);
      break;
    case 'year':
      req = request(`/yilian-cloud-backend-api/performance/group/year${query}`);
      break;
    default:
      break;
  }
  return req;
}
