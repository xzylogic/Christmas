export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { component: '404' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // system
      { path: '/', redirect: '/system/accounts' },
      {
        path: '/system',
        name: '系统管理',
        icon: 'setting',
        routes: [
          {
            path: '/system/accounts',
            name: '账号管理',
            component: './System/Accounts/Accounts',
          },
          {
            path: '/system/accounts/:id',
            name: '账号管理详情',
            component: './System/Accounts/AccountDetail/AccountDetail',
          },
          {
            path: '/system/roles',
            name: '角色管理',
            component: './System/Roles/Roles',
          },
          {
            path: '/system/roles/:id',
            name: '角色管理详情',
            component: './System/Roles/RoleDetail/RoleDetail',
          },
          {
            path: '/system/menus',
            name: '菜单管理',
            component: './System/Menus/Menus',
          },
        ],
      },
      // 市平台统计分析
      {
        path: '/shi-statistics',
        name: '市平台统计分析',
        icon: 'bar-chart',
        routes: [
          {
            path: '/shi-statistics/usage-of-hospitals-numbers',
            name: '各医院号源使用情况',
            component: './Statistics/UsageOfHospitalsNumbers/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-hospitals-appointments',
            name: '各医院预约量',
            component: './Statistics/AmountOfHospitalsAppointments/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-hospitals-refunds',
            name: '各医院退号量',
            component: './Statistics/AmountOfHospitalsRefunds/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-hospitals-failures',
            name: '各医院爽约量',
            component: './Statistics/AmountOfHospitalsFailures/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-channels-registration',
            name: '各渠道注册量',
            component: './Statistics/AmountOfChannelsRegistration/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-channels-refunds',
            name: '各渠道退号量',
            component: './Statistics/AmountOfChannelsRefunds/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-channels-failures',
            name: '各渠道爽约量',
            component: './Statistics/AmountOfChannelsFailures/Shi/Shi',
          },
          {
            path: '/shi-statistics/amount-of-channels-appointments',
            name: '各渠道预约量',
            component: './Statistics/AmountOfChannelsAppointments/Shi/Shi',
          },
        ],
      },
      // 医联统计分析
      {
        path: '/yilian-statistics',
        name: '医联统计分析',
        icon: 'bar-chart',
        routes: [
          {
            path: '/yilian-statistics/usage-of-hospitals-numbers',
            name: '各医院号源使用情况',
            component: './Statistics/UsageOfHospitalsNumbers/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-hospitals-appointments',
            name: '各医院预约量',
            component: './Statistics/AmountOfHospitalsAppointments/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-hospitals-refunds',
            name: '各医院退号量',
            component: './Statistics/AmountOfHospitalsRefunds/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-hospitals-failures',
            name: '各医院爽约量',
            component: './Statistics/AmountOfHospitalsFailures/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-channels-registration',
            name: '各渠道注册量',
            component: './Statistics/AmountOfChannelsRegistration/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-channels-refunds',
            name: '各渠道退号量',
            component: './Statistics/AmountOfChannelsRefunds/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-channels-failures',
            name: '各渠道爽约量',
            component: './Statistics/AmountOfChannelsFailures/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-channels-appointments',
            name: '各渠道预约量',
            component: './Statistics/AmountOfChannelsAppointments/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-daily-activeness',
            name: '各渠道日活量',
            component: './Statistics/AmountOfDailyActiveness/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-monthly-activeness',
            name: '各渠道月活量',
            component: './Statistics/AmountOfMonthlyActiveness/Yilian/Yilian',
          },
          {
            path: '/yilian-statistics/amount-of-download',
            name: '各渠道下载量',
            component: './Statistics/AmountOfDownload/Yilian/Yilian',
          },
        ],
      },
      // 区平台统计分析
      {
        path: '/qu-statistics',
        name: '区平台统计分析',
        icon: 'bar-chart',
        routes: [
          {
            path: '/qu-statistics/usage-of-hospitals-numbers',
            name: '各医院号源使用情况',
            component: './Statistics/UsageOfHospitalsNumbers/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-hospitals-appointments',
            name: '各医院预约量',
            component: './Statistics/AmountOfHospitalsAppointments/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-hospitals-refunds',
            name: '各医院退号量',
            component: './Statistics/AmountOfHospitalsRefunds/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-hospitals-failures',
            name: '各医院爽约量',
            component: './Statistics/AmountOfHospitalsFailures/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-channels-registration',
            name: '各渠道注册量',
            component: './Statistics/AmountOfChannelsRegistration/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-channels-refunds',
            name: '各渠道退号量',
            component: './Statistics/AmountOfChannelsRefunds/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-channels-failures',
            name: '各渠道爽约量',
            component: './Statistics/AmountOfChannelsFailures/Qu/Qu',
          },
          {
            path: '/qu-statistics/amount-of-channels-appointments',
            name: '各渠道预约量',
            component: './Statistics/AmountOfChannelsAppointments/Qu/Qu',
          },
        ],
      },
      // 医联微信业务
      {
        path: '/yilian-wechat-business',
        name: '医联微信业务',
        icon: 'reconciliation',
        routes: [
          {
            path: '/yilian-wechat-business/query',
            name: '业务查询',
            icon: 'search',
            routes: [
              {
                path: '/yilian-wechat-business/query/appointments',
                name: '预约查询',
                component: './Business/YilianWechat/Query/Appointments/Appointments',
              },
              {
                path: '/yilian-wechat-business/query/performance',
                name: '业绩查询',
                component: './Business/YilianWechat/Query/Performance/Performance',
              },
              {
                path: '/yilian-wechat-business/query/members',
                name: '会员查询',
                component: './Business/YilianWechat/Query/Members/Members',
              },
            ],
          },
          {
            path: '/yilian-wechat-business/management',
            name: '基础信息管理',
            icon: 'appstore',
            component: './Business/YilianWechat/Management/Management',
          },
          {
            path: '/yilian-wechat-business/statistics',
            name: '数据统计分析',
            icon: 'bar-chart',
            routes: [
              {
                path: '/yilian-wechat-business/statistics/popularization',
                name: '推广数据统计',
                component: './Business/YilianWechat/Statistics/Popularization/Popularization',
              },
              {
                path: '/yilian-wechat-business/statistics/popularization-report',
                name: '推广数据报表',
                component:
                  './Business/YilianWechat/Statistics/PopularizationReport/PopularizationReport',
              },
              {
                path: '/yilian-wechat-business/statistics/appointments',
                name: '预约数据统计',
                component: './Business/YilianWechat/Statistics/Appointments/Appointments',
              },
              {
                path: '/yilian-wechat-business/statistics/appointments-report',
                name: '预约数据报表',
                component:
                  './Business/YilianWechat/Statistics/AppointmentsReport/AppointmentsReport',
              },
            ],
          },
        ],
      },
      // 健康云业务
      {
        path: '/health-cloud-business',
        name: '健康云业务',
        icon: 'project',
        routes: [
          {
            path: '/health-cloud-business/statistics',
            name: '数据统计分析',
            icon: 'bar-chart',
            routes: [
              {
                path: '/health-cloud-business/statistics/popularization-report',
                name: '推广数据报表',
                component:
                  './Business/HealthCloud/Statistics/PopularizationReport/PopularizationReport',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
