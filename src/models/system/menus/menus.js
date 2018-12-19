import { message } from 'antd';
import { fetchMenuList, saveMenu, deleteMenu } from '@/services/system/menus/menus';

const reorderMenus = menusRoot => {
  const newMenusRoot = [];
  const newMenusParents = [];
  const newMenusChildren = [];
  const newMenusCChildren = [];
  if (menusRoot && menusRoot[0]) {
    const newRootMenu = {
      menuId: menusRoot[0].menuId,
      name: menusRoot[0].name,
      path: menusRoot[0].path,
      isDeleted: menusRoot[0].isDeleted,
      sort: menusRoot[0].sort,
      enable: menusRoot[0].enable,
      exact: menusRoot[0].exact,
      level: '1',
    };
    newMenusRoot.push(newRootMenu);
  }
  if (menusRoot && menusRoot[0] && menusRoot[0].children) {
    const menus = menusRoot[0].children;
    menus.forEach(menu => {
      const newMenu = {
        parentId: menusRoot[0].menuId,
        menuId: menu.menuId,
        name: menu.name,
        path: menu.path,
        isDeleted: menu.isDeleted,
        sort: menu.sort,
        icon: menu.icon,
        enable: menu.enable,
        exact: menu.exact,
        level: '2',
      };
      newMenusParents.push(newMenu);
      if (menu.children) {
        menu.children.forEach(menuChild => {
          const newMenuChild = {
            parentId: menu.menuId,
            menuId: menuChild.menuId,
            name: menuChild.name,
            path: menuChild.path,
            isDeleted: menuChild.isDeleted,
            sort: menuChild.sort,
            icon: menu.icon,
            enable: menuChild.enable,
            exact: menuChild.exact,
            level: '3',
          };
          newMenusChildren.push(newMenuChild);
          if (menuChild.children) {
            menuChild.children.forEach(menuCChild => {
              const newMenuCChild = {
                parentId: menuChild.menuId,
                menuId: menuCChild.menuId,
                name: menuCChild.name,
                path: menuCChild.path,
                isDeleted: menuCChild.isDeleted,
                sort: menuCChild.sort,
                icon: menu.icon,
                enable: menuCChild.enable,
                exact: menuCChild.exact,
                level: '4',
              };
              newMenusCChildren.push(newMenuCChild);
            });
          }
        });
      }
    });
  }
  return {
    menus: [...newMenusRoot, ...newMenusParents, ...newMenusChildren, ...newMenusCChildren],
    root: newMenusRoot,
    parents: [...newMenusRoot, ...newMenusParents, ...newMenusChildren],
    children: newMenusCChildren,
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
        message.success(res.msg || '保存菜单成功！！！');
        yield put({
          type: 'fetchMenuList',
        });
      } else {
        message.error((res && res.msg) || '保存菜单失败！！！');
      }
    },
    *deleteMenu({ payload }, { call, put }) {
      const res = yield call(deleteMenu, payload.menuId);
      if (res && res.code === 200) {
        message.success(res.msg || '删除菜单成功！！！');
        yield put({
          type: 'fetchMenuList',
        });
      } else {
        message.error((res && res.msg) || '删除菜单失败！！！');
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
