import request from '@/utils/request';

export async function fetchMenuList() {
  return request(`/menu/getMenus`);
}

export async function saveMenu(menu) {
  return request('/menu/addMenu', {
    method: 'POST',
    body: {
      ...menu,
    },
  });
}

export async function deleteMenu(menuId) {
  return request(`/menu/deleteMenus?menuId=${menuId}`);
}
