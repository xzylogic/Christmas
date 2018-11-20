import request from '@/utils/request';

export async function fetchMenuList() {
  return request(`/yilian-cloud-backend-api/menu/getMenus`);
}

export async function saveMenu(menu) {
  return request('/yilian-cloud-backend-api/menu/addMenu', {
    method: 'POST',
    body: {
      ...menu,
    },
  });
}

export async function deleteMenu(menuId) {
  return request(`/yilian-cloud-backend-api/menu/deleteMenus?menuId=${menuId}`);
}
