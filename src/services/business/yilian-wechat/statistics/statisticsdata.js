import request from '@/utils/request';

// 获取所有医院
export async function fetchAllHosNameService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allHos`);
}

// 获取所有小组
export async function fetchAllGroupNameService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allGroup`);
}

export async function fetchPromoteAttentionAmountService(way, params, page, size) {
  console.log(way, params, page, size);
  let query = `?page=${page || 0}&size=${size || 10}`;
  let req = '';
  if (params) {
    query += `${params}`;
  }
  req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/week${query}`);
  switch (way) {
    case 'day':
      req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/day${query}`);
      break;
    case 'week':
      req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/week${query}`);
      break;
    case 'month':
      req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/month${query}`);
      break;
    case 'year':
      req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/year${query}`);
      break;
    default:
      break;
  }
  return req;
}

export async function fetchAppointmentsDataService(way, params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;

  if (way) {
    query += `&${way}`;
  }
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/reservation/count${query}`);
}

// 按小组显示各医院预约量对比
export async function fetchAppointmentReportService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/reservation/groupHosCount${query}`);
}
