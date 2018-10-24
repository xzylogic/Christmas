export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: '/user/register', component: './User/Register' },
      // { path: '/user/register-result', component: './User/RegisterResult' },
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
        name: 'system',
        icon: 'setting',
        routes: [
          {
            path: '/system/accounts',
            name: 'accounts',
            component: './System/Accounts/Accounts',
          },
          {
            path: '/system/roles',
            name: 'roles',
            component: './System/Roles/Roles',
          },
          {
            path: '/system/menus',
            name: 'menus',
            component: './System/Menus/Menus',
          },
        ],
      },
      // business
      {
        path: '/business',
        name: 'business',
        icon: 'appstore',
        routes: [
          {
            path: '/business/medical-card-inquiry',
            name: 'medical-card-inquiry',
            component: './Business/MedicalCardInquiry/MedicalCardInquiry',
          },
          {
            path: '/business/registration-appointment-inquiry',
            name: 'registration-appointment-inquiry',
            component: './Business/RegistrationAppointmentInquiry/RegistrationAppointmentInquiry',
          },
          {
            path: '/business/performance-statistics',
            name: 'performance-statistics',
            component: './Business/PerformanceStatistics/PerformanceStatistics',
          },
          {
            path: '/business/application-dissemination',
            name: 'application-dissemination',
            component: './Business/ApplicationDissemination/ApplicationDissemination',
          },
          {
            path: '/business/dissemination-data-statistics',
            name: 'dissemination-data-statistics',
            component: './Business/DisseminationDataStatistics/DisseminationDataStatistics',
          },
          {
            path: '/business/registration-appointment-data-statistics',
            name: 'registration-appointment-data-statistics',
            component:
              './Business/RegistrationAppointmentDataStatistics/RegistrationAppointmentDataStatistics',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
