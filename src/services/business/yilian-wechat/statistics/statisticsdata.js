import request from '@/utils/request';

export default async function fetchPromoteAttentionAmountService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/week${query}`);
}

// export async function fetchPromoteAttentionAmountService(way, params, page, size) {
//   let query = `?page=${page || 0}&size=${size || 10}`;
//     if (params) {
//       query += `${params}`;
//     }
//     switch (way) {
//       case 'day':
//         req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/day${query}`);
//         break;
//       case 'week':
//         req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/week${query}`);
//         break;
//       case 'month':
//         req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/month${query}`);
//         break;
//       case 'year':
//         req = request(`/yilian-cloud-backend-api/ylWeChatCount/extendData/count/year${query}`);
//         break;
//       default:
//         break;
//     }
//   return req;
// }
