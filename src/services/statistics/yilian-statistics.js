import request from '@/utils/request';

export async function fetchYilianStatisticsService(searchData) {
  return request(`/yilian-cloud-backend-api/ylBook/bookNum`, {
    method: 'POST',
    body: { ...searchData },
  });
}

export async function fetchHospitalBookDetailService(searchData) {
  return request(`/yilian-cloud-backend-api/ylBook/hosBookCharts`, {
    method: 'POST',
    body: { ...searchData },
  });
}

export async function fetchHospitalCancelDetailService(searchData) {
  return request(`/yilian-cloud-backend-api/ylBook/hosCancelCharts`, {
    method: 'POST',
    body: { ...searchData },
  });
}

export async function fetchSearchHospitalsService(cityCode) {
  return request(
    `/yilian-cloud-backend-api/ylWeChatCount/search/hosByHosType?cityCode=${cityCode}`
  );
}
