import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Popconfirm } from 'antd';

const mapStateToProps = state => ({
  menuCopy: state.menu.menuCopy,
  selectedMenu: state.menu.selectedMenu,
  submitting: state.loading.effects['menu/saveMenu'],
  deleting: state.loading.effects['menu/deleteMenu'],
});

const mapDispatchToProps = dispatch => ({
  onSaveMenu: data =>
    dispatch({
      type: 'menu/saveMenu',
      payload: { data },
    }),
  onDeleteMenu: menuId =>
    dispatch({
      type: 'menu/deleteMenu',
      payload: { menuId },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class MenuForm extends Component {
  handleSubmit = e => {
    const { form, onSaveMenu } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSaveMenu(values);
      }
    });
  };

  handleDeleteConfirm = e => {
    const { selectedMenu, onDeleteMenu } = this.props;
    e.preventDefault();
    onDeleteMenu(selectedMenu.menuId);
  };

  handleDeleteCancel = e => {
    e.preventDefault();
  };

  render() {
    const {
      title,
      type,
      selectedMenu,
      submitting,
      deleting,
      menuCopy: { parents, root },
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    let menuFormContent = '';
    if (!selectedMenu) {
      menuFormContent = type === 'new' ? <p>请选择父级菜单</p> : <p>请选择菜单</p>;
    }

    if (selectedMenu && type === 'edit') {
      menuFormContent = (
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('menuId', {
              initialValue: selectedMenu.menuId,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input hidden />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单名称">
            {getFieldDecorator('name', {
              initialValue: selectedMenu.name,
              rules: [
                {
                  required: true,
                  message: '请填写菜单名称',
                },
              ],
            })(<Input placeholder="请填写菜单名称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单链接">
            {getFieldDecorator('path', {
              initialValue: selectedMenu.path,
              rules: [
                {
                  required: true,
                  message: '请填写菜单链接',
                },
              ],
            })(<Input placeholder="请填写菜单链接" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单图标">
            {getFieldDecorator('icon', {
              initialValue: selectedMenu.icon,
              rules: [
                {
                  required: false,
                  message: '请填写菜单图标',
                },
              ],
            })(<Input placeholder="请填写菜单图标" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单排序">
            {getFieldDecorator('sort', {
              initialValue: selectedMenu.sort,
              rules: [
                {
                  required: true,
                  message: '请填写菜单排序',
                },
              ],
            })(<Input type="text" placeholder="请填写菜单排序" />)}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              修改菜单
            </Button>
          </Form.Item>
        </Form>
      );
    }

    if (selectedMenu && type === 'new') {
      const mymenu = parents.filter(obj => obj.menuId === selectedMenu.menuId);
      if (mymenu.length !== 0) {
        menuFormContent = (
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <Form.Item {...formItemLayout} label="父级菜单">
              {getFieldDecorator('parentId', {
                initialValue: selectedMenu.menuId,
                rules: [
                  {
                    required: true,
                    message: '父级菜单不能为空',
                  },
                ],
              })(
                <Select disabled>
                  <Select.Option value={selectedMenu.menuId}>{selectedMenu.name}</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="菜单名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请填写菜单名称',
                  },
                ],
              })(<Input placeholder="请填写菜单名称" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="菜单链接">
              {getFieldDecorator('path', {
                rules: [
                  {
                    required: true,
                    message: '请填写菜单链接',
                  },
                ],
              })(<Input placeholder="请填写菜单链接" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="菜单图标">
              {getFieldDecorator('icon', {
                initialValue: selectedMenu.icon,
                rules: [
                  {
                    required: false,
                    message: '请填写菜单图标',
                  },
                ],
              })(<Input placeholder="请填写菜单图标" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="菜单排序">
              {getFieldDecorator('sort', {
                rules: [
                  {
                    required: true,
                    message: '请填写菜单排序',
                  },
                ],
              })(<Input type="number" placeholder="请填写菜单排序" />)}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                生成菜单
              </Button>
            </Form.Item>
          </Form>
        );
      } else {
        menuFormContent = <p>请选择正确的父级菜单</p>;
      }
    }

    if (selectedMenu && type === 'delete') {
      const mymenu = root.filter(obj => obj.menuId === selectedMenu.menuId);
      if (mymenu.length === 0) {
        menuFormContent = (
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <Form.Item {...formItemLayout} label="菜单名称">
              {getFieldDecorator('name', {
                initialValue: selectedMenu.name,
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Popconfirm
                placement="bottom"
                title={`是否要删除菜单：${selectedMenu.name}？`}
                onConfirm={this.handleDeleteConfirm}
                onCancel={this.handleDeleteCancel}
                okText="是"
                cancelText="否"
              >
                <Button type="primary" loading={deleting}>
                  删除菜单
                </Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        );
      } else {
        menuFormContent = <p>顶级菜单不能删除！！！</p>;
      }
    }

    return (
      <div>
        <h2>{title}</h2>
        {menuFormContent}
      </div>
    );
  }
}

export default MenuForm;
