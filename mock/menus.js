const menus = {
  code: 200,
  data: [
    {
      menuId: 'a776619279cb46f39653cbda6adf995c',
      name: '预约诊疗服务运营',
      path: 'root',
      isDeleted: '0',
      check: false,
      enable: false,
      exact: false,
      children: [
        {
          menuId: '8549df7c89804311b615665881eaf0c6',
          name: '系统管理',
          path: 'system/manager',
          isDeleted: '0',
          sort: '0',
          check: false,
          enable: false,
          exact: false,
          children: [
            {
              menuId: '8c2235927f57409c809cdf789158340b',
              name: '角色管理',
              path: 'system/rolemanager',
              isDeleted: '0',
              sort: '1',
              check: false,
              enable: false,
              exact: false,
              children: [],
            },
            {
              menuId: 'd92ace7d40844814bcebe0cd6a684c35',
              name: '用户管理',
              path: 'system/usermanager',
              isDeleted: '0',
              sort: '0',
              check: false,
              enable: false,
              exact: false,
              children: [],
            },
            {
              menuId: 'ed3bc7b38e284faabbb813cd79fdedf5',
              name: '菜单管理',
              path: 'system/menumanager',
              isDeleted: '0',
              sort: '2',
              check: false,
              enable: false,
              exact: false,
              children: [],
            },
          ],
        },
        {
          menuId: 'a1762bc584f04164a950c2fc1a7209bb',
          name: '医联统计分析',
          path: 'yilian/count',
          isDeleted: '0',
          sort: '0',
          check: false,
          enable: false,
          exact: false,
          children: [
            {
              menuId: '062421b8075240b3946e624e48b60a3c',
              name: '各医院预约联统计',
              path: 'yilian/count/reservation',
              isDeleted: '0',
              sort: '1',
              check: false,
              enable: false,
              exact: false,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const success = {
  code: 200,
  data: null,
};

export default {
  'GET /yilian-cloud-backend-api/menu/getMenus': menus,
  'POST /yilian-cloud-backend-api/menu/addMenu': success,
  'GET /yilian-cloud-backend-api/menu/deleteMenus': success,
};
