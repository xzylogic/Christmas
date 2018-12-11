import React, { PureComponent } from 'react';
import { Spin, Menu, Icon, Dropdown } from 'antd';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  render() {
    const { currentUser, onMenuClick, theme } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {/* <Menu.Item key="changePassword">
          <Icon type="user" />
          修改密码
        </Menu.Item> */}
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {currentUser && currentUser.realName ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              {/* <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              /> */}
              <span className={styles.name}>{currentUser.realName || currentUser.username}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
