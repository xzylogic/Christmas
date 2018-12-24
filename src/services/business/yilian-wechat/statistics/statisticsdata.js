import request from '@/utils/request';

// 获取所有医院
export async function fetchAllHosNameService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allHos`);
}

// 获取所有小组
export async function fetchAllGroupNameService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allGroup`);
}

// 获取推广数据统计
export async function fetchPromoteAttentionAmountService(params, page, size, way) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  let req = '';
  if (params) {
    query += `${params}`;
  }
  // req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/day${query}`);
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

// 获取预约数据统计
export async function fetchAppointmentsDataService(params, page, size, way) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (way) {
    query += `${way}`;
  }
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/reservation/count${query}`);
}

// 根据医院类型查询医院
export async function fetchHosTypeService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/hosByHosType${query}`);
}

// 根据组别查询推广医院
export async function fetchHosGroupService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/hosByGroupId${query}`);
}

/**
 * 按小组显示各医院预约量对比（医院总量）
 * @param {*} params [startTime | endTime | groupId]
 * @param {*} page
 * @param {*} size
 */
export async function fetchAppointmentReportType1Service(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/reservation/groupHosCount${query}`);
}

// 修改密码
export async function modifyPasswordService(userId, oldPassword, newPassword) {
  return request(
    `/yilian-cloud-backend-api/user/modifyPassword?userId=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`,
    {
      method: 'POST',
      body: {},
    }
  );
}
