import request from '@/utils/request';

export async function fetchGroupListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/hos/search/group${query}`);
}

export async function fetchMemberListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/hos/search/person${query}`);
}

export async function fetchLocationListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/hos/search/site${query}`);
}

export async function createGroupService(postData) {
  return request(`/yilian-cloud-backend-api/hos/create/group`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function createMemberService(postData) {
  return request(`/yilian-cloud-backend-api/hos/create/person`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function createLocationService(postData) {
  return request(`/yilian-cloud-backend-api/hos/create/site`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function modifyGroupService(postData) {
  return request(`/yilian-cloud-backend-api/hos/modify/group`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function modifyMemberService(postData) {
  return request(`/yilian-cloud-backend-api/hos/modify/person`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function modifyLocationService(postData) {
  return request(`/yilian-cloud-backend-api/hos/modify/site`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function deleteGroupService(id) {
  return request(`/yilian-cloud-backend-api/hos/delete/group?id=${id}`, {
    method: 'POST',
    body: {},
  });
}

export async function deleteMemberService(id) {
  return request(`/yilian-cloud-backend-api/hos/delete/person?id=${id}`, {
    method: 'POST',
    body: {},
  });
}

export async function deleteLocationService(id) {
  return request(`/yilian-cloud-backend-api/hos/delete/site?id=${id}`, {
    method: 'POST',
    body: {},
  });
}

export async function getMemberService() {
  return request(`/yilian-cloud-backend-api/hos/base/person`);
}

// 所有地点
export async function fetchAllHosNameService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allHos`);
}

// 所有小组
export async function fetchAllGroupNameService() {
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/allGroup`);
}

// 所有有效地点
export async function fetchValiHosNameService() {
  return request(`/yilian-cloud-backend-api/hos/search/validSite`);
}

// 所有有效小组
export async function fetchValiGroupNameService() {
  return request(`/yilian-cloud-backend-api/hos/search/validGroup`);
}

export async function addHosToGroupService(newPostData) {
  return request(
    `/yilian-cloud-backend-api/ylWeChatCount/add/HosToGroup?groupId=${newPostData.name}&hosId=${
      newPostData.hosName
    }`,
    {
      method: 'POST',
      body: {},
    }
  );
}

// 根据组别查询推广医院
export async function fetchHosGroupService(params, page, size) {
  let query = `?page=${page || 0}&size=${size || 10}`;
  if (params) {
    query += `${params}`;
  }
  return request(`/yilian-cloud-backend-api/ylWeChatCount/search/hosByGroupId${query}`);
}

// 导出小组
export async function fetchGroupExportService(params) {
  return request(`/yilian-cloud-backend-api/hos/export/group${params}`);
}

// 导出人员
export async function fetchMemberExportService(params) {
  return request(`/yilian-cloud-backend-api/hos/export/person${params}`);
}

// 导出地点
export async function fetchLocationExportService(params) {
  return request(`/yilian-cloud-backend-api/hos/export/site${params}`);
}
