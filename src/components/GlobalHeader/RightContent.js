import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin, Menu, Icon, Dropdown, Modal, Form, Input } from 'antd';
import styles from './index.less';

const mapDispatchToProps = dispatch => ({
  onModifyPassword: postData =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/modifyPassword',
      payload: { postData },
    }),
});

@connect(
  null,
  mapDispatchToProps
)
@Form.create()
class GlobalHeaderRight extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onModifyPassword, onClose, currentUser } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = {
          userId: currentUser.userId,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };
        onModifyPassword(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      }
    });
  };

  compareToOldPassword = (_, value, callback) => {
    const { currentUser } = this.props;
    if (value && value !== currentUser.password) {
      callback('与原密码不一致!');
    } else {
      callback();
    }
  };

  compareToFirstPassword = (_, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  };

  validateToNewPassword = (_, value, callback) => {
    // 密码长度6-18位，由数字和大小写字母组合而成
    const pPattern = /^.*(?=.{6,18})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (value && !pPattern.test(value)) {
      callback('密码长度6-18位，需包含数字和大小写字母!');
    } else {
      callback();
    }
  };

  render() {
    const {
      currentUser,
      onMenuClick,
      theme,
      changePWD,
      onClose,
      form: { getFieldDecorator },
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="changePassword">
          <Icon type="user" />
          修改密码
        </Menu.Item>
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 5 },
        md: { span: 17 },
      },
    };

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

        <Modal
          title="修改密码"
          visible={changePWD}
          onOk={this.handleSubmit}
          okButtonProps={{ htmlType: 'submit' }}
          onCancel={onClose}
        >
          <Form>
            <Form.Item {...formItemLayout} label="原密码">
              {getFieldDecorator('oldPassword', {
                rules: [
                  { required: true, message: '请输入原密码' },
                  { validator: this.compareToOldPassword },
                ],
              })(<Input type="password" placeholder="请输入原密码" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="新密码">
              {getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '请输入新密码' },
                  { validator: this.validateToNewPassword },
                ],
              })(
                <Input type="password" placeholder="密码长度6-18位，由数字和大小写字母组合而成" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: '请确认新密码' },
                  { validator: this.compareToFirstPassword },
                ],
              })(<Input type="password" placeholder="请确认新密码" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default GlobalHeaderRight;
