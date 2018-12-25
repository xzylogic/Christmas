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

export async function createGroupMonthService(postData) {
  return request(`/yilian-cloud-backend-api/performance/groupMonth/update`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function fetchMemberService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/performance/person/all${query}`);
}

export async function fetchMemberPerformanceDetailService(way, params, page, size) {
  let req = '';
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  switch (way) {
    case 'day':
      req = request(`/yilian-cloud-backend-api/performance/person/day${query}`);
      break;
    case 'week':
      req = request(`/yilian-cloud-backend-api/performance/person/week${query}`);
      break;
    case 'month':
      req = request(`/yilian-cloud-backend-api/performance/person/month${query}`);
      break;
    case 'year':
      req = request(`/yilian-cloud-backend-api/performance/person/year${query}`);
      break;
    default:
      break;
  }
  return req;
}

export async function createMemberMonthService(postData) {
  return request(`/yilian-cloud-backend-api/performance/personMonth/update`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function fetchLocationService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/performance/site/all${query}`);
}

export async function fetchLocationPerformanceDetailService(way, params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  let req = '';
  if (params) {
    query += `${params}`;
  }
  switch (way) {
    case 'day':
      req = request(`/yilian-cloud-backend-api/performance/site/day${query}`);
      break;
    case 'week':
      req = request(`/yilian-cloud-backend-api/performance/site/week${query}`);
      break;
    case 'month':
      req = request(`/yilian-cloud-backend-api/performance/site/month${query}`);
      break;
    case 'year':
      req = request(`/yilian-cloud-backend-api/performance/site/year${query}`);
      break;
    default:
      break;
  }
  return req;
}

export async function fetchAppointmentService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/reservation/search${query}`);
}

export async function fetchMembershipPerformanceDetail(params) {
  return request(`/yilian-cloud-backend-api/member/search${params}`);
}

// 获取所有小组
export async function getQueryMessageService() {
  return request(`/yilian-cloud-backend-api/performance/groupMonth/data`);
}

export async function fetchHosnameService() {
  return request(`/yilian-cloud-backend-api/hos/base/person`);
}

export async function fetchallPersonService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allPerson`);
}

export async function fetchGroupMonthService(params) {
  return request(`/yilian-cloud-backend-api/performance/groupMonth/search?name=${params}`);
}

export async function fetchMemberMonthService(params) {
  return request(`/yilian-cloud-backend-api/performance/personMonth/search?name=${params}`);
}
