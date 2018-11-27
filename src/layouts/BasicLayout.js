import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { formatMessage } from 'umi/locale';
import SiderMenu from '@/components/SiderMenu';
import Authorized from '@/utils/Authorized';
import SettingDrawer from '@/components/SettingDrawer';
import logo from '../assets/icons/logo-large.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  state = {
    rendering: true,
    isMobile: false,
    menuData: this.getMenuData(),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting/getSetting',
    });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  getMenuData() {
    const { location } = this.props;
    console.log(location);
    return [
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
    // console.log(JSON.stringify(memoizeOneFormatter(routes)));
    // return memoizeOneFormatter(routes);
    // return data;
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return '上海市预约诊疗服务运营管理后台';
    }
    const message = currRouterData.locale
      ? formatMessage({
          id: currRouterData.locale || currRouterData.name,
          defaultMessage: currRouterData.name,
        })
      : currRouterData.name;
    return `${message} - 上海市预约诊疗服务运营管理后台`;
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    const { rendering } = this.state;
    if ((rendering || process.env.NODE_ENV === 'production') && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
    } = this.props;
    const { isMobile, menuData } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const routerConfig = this.matchParamsPath(pathname);
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            Authorized={Authorized}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <Authorized
              authority={routerConfig && routerConfig.authority}
              noMatch={<Exception403 />}
            >
              {children}
            </Authorized>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {/* {this.renderSettingDrawer()} */}
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting,
}))(BasicLayout);
