# 上海市预约诊疗服务运营管理后台

## 技术栈
- 【Ant Design Pro】[https://pro.ant.design/](https://pro.ant.design/)
- 【UmiJS】[https://umijs.org/](https://umijs.org/)
- 【DvaJS】[https://dvajs.com/](https://dvajs.com/)
- 【React】[https://reactjs.org/](https://reactjs.org/)
- 【Redux】[https://redux.js.org/](https://redux.js.org/)
- 【React Redux】[https://react-redux.js.org/](https://react-redux.js.org/)
- 【Redux Saga】[https://redux-saga.js.org/](https://redux-saga.js.org/)
- 【React Router】[https://reacttraining.com/react-router/web](https://reacttraining.com/react-router/web)

## 需求列表

<div style="width: 80%;margin: 0 auto;text-align: center;">
  <img alt="需求列表" src="http://image.violetqqy.com/yilian.png-normal" />
</div>

## 页面结构(pages)

```
- User
  - Login //登录
- System // 系统管理
  - Accounts // 账号管理
    - AccountDetail // 账号管理详情
  - Menus // 菜单管理
  - Roles // 角色管理
    - RoleDetail // 角色管理详情
- Statistics // 统计分析
  - UsageOfHospitalsNumbers // 各医院号源使用情况
  - AmountOfHospitalsAppointments // 各医院预约量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
  - AmountOfHospitalsRefunds // 各医院退号量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
  - AmountOfHospitalsFailures // 各医院爽约量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
  - AmountOfChannelsRegistration // 各渠道注册量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
  - AmountOfChannlesRefunds // 各渠道退号量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
  - AmountOfChannlesFailures // 各渠道爽约量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
  - AmountOfChannelsAppointments // 各渠道预约量
    - Shi // 市平台
    - Yilian // 医联平台
    - Qu // 区平台
- Business // 业务
  - YilianWechat // 医联微信
    - Query // 查询
      - Appointments // 预约查询
      - Performance // 业绩查询
      - Members // 会员查询
    - Management // 管理
    - Statistics // 统计
        - Popularization // 推广数据统计
        - PopularizationReport // 推广数据报表
        - Appointments // 预约数据统计
        - AppointmentsReport // 预约数据报表
```

## 菜单结构

```
[
      {
        path: '/',
      },
      // 系统管理
      {
        path: '/system',
        name: '系统管理',
        icon: 'setting',
        children: [
          {
            path: '/system/accounts',
            name: '账号管理',
          },
          {
            path: '/system/roles',
            name: '角色管理',
          },
          {
            path: '/system/menus',
            name: '菜单管理',
          },
        ],
      },
      // 市平台统计分析
      {
        path: '/shi-statistics',
        name: '市平台统计分析',
        icon: 'bar-chart',
        children: [
          {
            path: '/shi-statistics/usage-of-hospitals-numbers',
            name: '各医院号源使用情况',
          },
          {
            path: '/shi-statistics/amount-of-hospitals-appointments',
            name: '各医院预约量',
          },
          {
            path: '/shi-statistics/amount-of-hospitals-refunds',
            name: '各医院退号量',
          },
          {
            path: '/shi-statistics/amount-of-hospitals-failures',
            name: '各医院爽约量',
          },
          {
            path: '/shi-statistics/amount-of-channels-registration',
            name: '各渠道注册量',
          },
          {
            path: '/shi-statistics/amount-of-channels-refunds',
            name: '各渠道退号量',
          },
          {
            path: '/shi-statistics/amount-of-channels-failures',
            name: '各渠道爽约量',
          },
          {
            path: '/shi-statistics/amount-of-channels-appointments',
            name: '各渠道预约量',
          },
        ],
      },
      // 医联统计分析
      {
        path: '/yilian-statistics',
        name: '医联统计分析',
        icon: 'bar-chart',
        children: [
          {
            path: '/yilian-statistics/usage-of-hospitals-numbers',
            name: '各医院号源使用情况',
          },
          {
            path: '/yilian-statistics/amount-of-hospitals-appointments',
            name: '各医院预约量',
          },
          {
            path: '/yilian-statistics/amount-of-hospitals-refunds',
            name: '各医院退号量',
          },
          {
            path: '/yilian-statistics/amount-of-hospitals-failures',
            name: '各医院爽约量',
          },
          {
            path: '/yilian-statistics/amount-of-channels-registration',
            name: '各渠道注册量',
          },
          {
            path: '/yilian-statistics/amount-of-channels-refunds',
            name: '各渠道退号量',
          },
          {
            path: '/yilian-statistics/amount-of-channels-failures',
            name: '各渠道爽约量',
          },
          {
            path: '/yilian-statistics/amount-of-channels-appointments',
            name: '各渠道预约量',
          },
          {
            path: '/yilian-statistics/amount-of-daily-activeness',
            name: '各渠道日活量',
          },
          {
            path: '/yilian-statistics/amount-of-monthly-activeness',
            name: '各渠道月活量',
          },
          {
            path: '/yilian-statistics/amount-of-download',
            name: '各渠道下载量',
          },
        ],
      },
      // 区平台统计分析
      {
        path: '/qu-statistics',
        name: '区平台统计分析',
        icon: 'bar-chart',
        children: [
          {
            path: '/qu-statistics/usage-of-hospitals-numbers',
            name: '各医院号源使用情况',
          },
          {
            path: '/qu-statistics/amount-of-hospitals-appointments',
            name: '各医院预约量',
          },
          {
            path: '/qu-statistics/amount-of-hospitals-refunds',
            name: '各医院退号量',
          },
          {
            path: '/qu-statistics/amount-of-hospitals-failures',
            name: '各医院爽约量',
          },
          {
            path: '/qu-statistics/amount-of-channels-registration',
            name: '各渠道注册量',
          },
          {
            path: '/qu-statistics/amount-of-channels-refunds',
            name: '各渠道退号量',
          },
          {
            path: '/qu-statistics/amount-of-channels-failures',
            name: '各渠道爽约量',
          },
          {
            path: '/qu-statistics/amount-of-channels-appointments',
            name: '各渠道预约量',
          },
        ],
      },
      // 医联微信业务
      {
        path: '/yilian-wechat-business',
        name: '医联微信业务',
        icon: 'reconciliation',
        children: [
          {
            path: '/yilian-wechat-business/query',
            name: '业务查询',
            icon: 'search',
            children: [
              {
                path: '/yilian-wechat-business/query/appointments',
                name: '预约查询',
              },
              {
                path: '/yilian-wechat-business/query/performance',
                name: '业绩查询',
              },
              {
                path: '/yilian-wechat-business/query/members',
                name: '会员查询',
              },
            ],
          },
          {
            path: '/yilian-wechat-business/management',
            name: '基础信息管理',
            icon: 'appstore',
          },
          {
            path: '/yilian-wechat-business/statistics',
            name: '数据统计分析',
            icon: 'bar-chart',
            children: [
              {
                path: '/yilian-wechat-business/statistics/popularization',
                name: '推广数据统计',
              },
              {
                path: '/yilian-wechat-business/statistics/popularization-report',
                name: '推广数据报表',
              },
              {
                path: '/yilian-wechat-business/statistics/appointments',
                name: '预约数据统计',
              },
              {
                path: '/yilian-wechat-business/statistics/appointments-report',
                name: '预约数据报表',
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
        children: [
          {
            path: '/health-cloud-business/statistics',
            name: '数据统计分析',
            icon: 'bar-chart',
            children: [
              {
                path: '/health-cloud-business/statistics/popularization-report',
                name: '推广数据报表',
              },
            ],
          },
        ],
      },
    ];
```

## 数据状态管理(models)

- routing
- global
- setting
- login(登录信息)
- menu(系统管理-菜单管理)
- account(系统管理-账号管理)
- role(系统管理-角色管理)
- businessYilianWechatManagement(医联微信业务-基础信息管理)
- businessYilianWechatQuery(医联微信业务-业务查询)
- businessYilianWechatStatistics(医联微信业务-业务统计)
- statistics(统计分析数据)
- loading

## 目录清单

- config
- dist
- docker
- functions
- mock
- node_modules
- public
- scripts
- src
  - assets(静态资源文件，存放图片等)
  - components(组件)
  - e2e
  - layouts(布局)
  - locales
  - models(状态管理)
  - pages(页面)
  - services(数据请求)
  - utils
  - defaultSettings.js
  - global.less
- tests
- package.json
