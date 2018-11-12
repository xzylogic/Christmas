import request from '@/utils/request';

export async function fetchMenuList() {
  return request(`http://10.2.100.205:8080/menu/getMenus`);
}

export async function saveMenu(menu) {
  return request('http://10.2.100.205:8080/menu/addMenu', {
    method: 'POST',
    body: {
      ...menu,
    },
  });
}

export async function deleteMenu(menuId) {
  return request(`http://10.2.100.205:8080/menu/deleteMenus?menuId=${menuId}`);
}
