import request from '@/utils/request';

export async function fetchYilianStatisticsService(searchData) {
  return request(`/yilian-cloud-backend-api/ylBook/bookNum`, {
    method: 'POST',
    body: { ...searchData },
  });
}

export async function fetchSearchHospitalsService(cityCode) {
  return request(
    `/yilian-cloud-backend-api/ylWeChatCount/search/hosByHosType?cityName=${cityCode}`
  );
}
