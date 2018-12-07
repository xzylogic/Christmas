import request from '@/utils/request';

/**
 * 按小组统计医院明细（微信关注量、注册量、注册转化率总量对比）
 * @param {*} params [startTime | endTime | groupName | countType(day/week/month/year)]
 * @param {*} page
 * @param {*} size
 */
export async function fetchPopularizationReportType1Service(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/groupHosCount${query}`);
}

/**
 * 按小组（微信关注量、注册量、注册转化率）总量统计
 * @param {*} params [startTime | endTime | countType(day/week/month/year)]
 * @param {*} page
 * @param {*} size
 */
export async function fetchPopularizationReportType2Service(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/groupTotalCount${query}`);
}

/**
 * 按所有医院（微信关注量、注册量、注册转化率）总量统计
 * @param {*} params [startTime | endTime | countType(day/week/month/year)]
 * @param {*} page
 * @param {*} size
 */
export async function fetchPopularizationReportType3Service(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/hosTotalCount${query}`);
}

/**
 * 微信关注量、注册量、注册转化率日数据（根据小组统计）
 * @param {*} params [time]
 * @param {*} page
 * @param {*} size
 */
export async function fetchPopularizationReportType4Service(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/weChatDailyCount${query}`);
}

export async function fetchSearchGroupListService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allGroup`);
}
