import { message } from 'antd';
import { fetchMenuList, saveMenu, deleteMenu } from '@/services/system/menus/menus';

const reorderMenus = menusRoot => {
  const newMenusRoot = [];
  const newMenusParents = [];
  const newMenusChildren = [];
  if (menusRoot && menusRoot[0]) {
    const newRootMenu = {
      menuId: menusRoot[0].menuId,
      name: menusRoot[0].name,
      path: menusRoot[0].path,
      isDeleted: menusRoot[0].isDeleted,
      sort: menusRoot[0].sort,
      enable: menusRoot[0].enable,
      exact: menusRoot[0].exact,
    };
    newMenusRoot.push(newRootMenu);
  }
  if (menusRoot && menusRoot[0] && menusRoot[0].children) {
    const menus = menusRoot[0].children;
    menus.forEach(menu => {
      const newMenu = {
        menuId: menu.menuId,
        name: menu.name,
        path: menu.path,
        isDeleted: menu.isDeleted,
        sort: menu.sort,
        enable: menu.enable,
        exact: menu.exact,
      };
      newMenusParents.push(newMenu);
      if (menu.children) {
        menu.children.forEach(menuChild => {
          const newMenuChild = {
            menuId: menuChild.menuId,
            name: menuChild.name,
            path: menuChild.path,
            isDeleted: menuChild.isDeleted,
            sort: menuChild.sort,
            enable: menuChild.enable,
            exact: menuChild.exact,
          };
          newMenusChildren.push(newMenuChild);
        });
      }
    });
  }
  return {
    menus: [...newMenusRoot, ...newMenusParents, ...newMenusChildren],
    root: newMenusRoot,
    parents: [...newMenusRoot, ...newMenusParents],
    children: newMenusChildren,
  };
};

export default {
  namespace: 'menu',

  state: {
    menuList: [],
    menuCopy: {},
    selectedMenu: null,
  },

  effects: {
    *fetchMenuList(_, { call, put }) {
      const res = yield call(fetchMenuList);
      if (res && res.code === 200) {
        yield put({
          type: 'updateMenuList',
          payload: res.data,
        });
        yield put({
          type: 'updateSelectedMenu',
          payload: null,
        });
      }
    },
    *saveMenu({ payload }, { call, put }) {
      const res = yield call(saveMenu, payload.data);
      if (res && res.code === 200) {
        message.success(res.message || '保存菜单成功！！！');
        yield put({
          type: 'fetchMenuList',
        });
      } else {
        message.error(res.message || '保存菜单失败！！！');
      }
    },
    *deleteMenu({ payload }, { call, put }) {
      const res = yield call(deleteMenu, payload.menuId);
      if (res && res.code === 200) {
        message.success(res.message || '删除菜单成功！！！');
        yield put({
          type: 'fetchMenuList',
        });
      } else {
        message.error(res.message || '删除菜单失败！！！');
      }
    },
  },

  reducers: {
    updateMenuList(state, { payload }) {
      const menuCopy = reorderMenus(payload);
      return {
        ...state,
        menuList: payload || [],
        menuCopy,
      };
    },
    updateSelectedMenu(state, { payload }) {
      return {
        ...state,
        selectedMenu: payload || null,
      };
    },
  },
};
