import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';
import Authorized from '@/utils/Authorized';

const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true,
    changePWD: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;

    if (key === 'changePassword') {
      this.setState({ changePWD: true });

      // console.log(this.props)

      // currentUser
      //   password

      // const { visible } = this.state;
      // console.log(visible)

      // router.push('/account/center');
      // return;
      // }
      // if (key === 'triggerError') {
      //   router.push('/exception/trigger');
      //   return;
      // }
      // if (key === 'userinfo') {
      //   router.push('/account/settings/base');
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  render() {
    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible, changePWD } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            Authorized={Authorized}
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            changePWD={changePWD}
            onClose={() => this.setState({ changePWD: false })}
            {...this.props}
          />
        )}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ login, global, setting }) => ({
  currentUser: login.currentUser,
  collapsed: global.collapsed,
  setting,
}))(HeaderView);
