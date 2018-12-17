import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, TreeSelect } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import classes from '../Roles.less';

const mapStateToProps = state => ({
  menuList: state.menu.menuList,
  menus: state.menu.menuCopy.menus,
  currentRole: state.role.currentRole,
  loading: state.loading.effects['role/saveRole'],
});

const mapDispatchToProps = dispatch => ({
  onSaveRole: data =>
    dispatch({
      type: 'role/saveRole',
      payload: { data },
    }),
  onFetchRole: roleId =>
    dispatch({
      type: 'role/fetchRole',
      payload: { roleId },
    }),
  onResetCurrentRole: () =>
    dispatch({
      type: 'role/updateCurrentRole',
      payload: null,
    }),
  onFetchMenuList: () =>
    dispatch({
      type: 'menu/fetchMenuList',
    }),
});

const getTreeDate = (tree, copy) => {
  let treeLevel1 = [];
  let treeCopy = [];
  if (tree && Array.isArray(tree)) {
    const treeLevel4 = tree.filter(obj => obj.level === '4').map(data => ({
      parent: data.parentId,
      title: data.name,
      key: data.menuId,
      value: data.menuId,
    }));
    const treeLevel3 = tree.filter(obj => obj.level === '3').map(data => {
      const children = treeLevel4.filter(child => child.parent === data.menuId);
      const childrenValue = children.reduce((pre, curr) => [...pre, curr.value], []);
      return {
        parent: data.parentId,
        title: data.name,
        key: data.menuId,
        value: [data.menuId, ...childrenValue].join('-'),
        children,
      };
    });
    const treeLevel2 = tree.filter(obj => obj.level === '2').map(data => {
      const children = treeLevel3.filter(child => child.parent === data.menuId);
      const childrenValue = children.reduce((pre, curr) => [...pre, curr.value], []);
      return {
        parent: data.parentId,
        title: data.name,
        key: data.menuId,
        value: [data.menuId, ...childrenValue].join('-'),
        children,
      };
    });
    treeLevel1 = tree.filter(obj => obj.level === '1').map(data => {
      const children = treeLevel2.filter(child => child.parent === data.menuId);
      const childrenValue = children.reduce((pre, curr) => [...pre, curr.value], []);
      return {
        parent: data.parentId,
        title: data.name,
        key: data.menuId,
        value: [data.menuId, ...childrenValue].join('-'),
        children,
      };
    });
    treeCopy = [...treeLevel1, ...treeLevel2, ...treeLevel3, ...treeLevel4];
  }
  return copy ? treeCopy : treeLevel1;
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class RoleDetail extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      onResetCurrentRole,
      onFetchRole,
      menuList,
      onFetchMenuList,
    } = this.props;

    if (id !== '0') {
      onFetchRole(id);
    } else {
      onResetCurrentRole();
    }
    if (!menuList || (menuList && menuList.length === 0)) {
      onFetchMenuList();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      onSaveRole,
      form,
      match: {
        params: { id },
      },
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const defaultMenuIds = values.role.join(',');
        const menuIds = defaultMenuIds.replace(/-/gi, ',');
        const formData = {
          roleName: values.roleName,
          menuIds,
          defaultMenuIds,
        };
        if (id !== '0') {
          formData.roleId = id;
        }
        onSaveRole(formData);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      history: { goBack },
      currentRole,
      menus,
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

    const treeData = getTreeDate(menus);
    const tProps = {
      treeData,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      searchPlaceholder: '请选择菜单权限',
      style: {
        width: '100%',
      },
    };

    let initialValue = [];
    if (currentRole && currentRole.defaultMenuIds) {
      initialValue = currentRole.defaultMenuIds.split(',');
      // initialValue = idsArr.map(id => {
      //   const idskey = getTreeDate(menus, true).filter(data => data.value === id).map(data => data.key);
      //   return idskey;
      // }).reduce((pre, curr) => ([...pre, ...curr]), []);
    }

    return (
      <PageHeaderWrapper>
        <div className={classes.Roles}>
          <Form className={classes.RoleFormContainer} onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="角色名称">
              {getFieldDecorator('roleName', {
                initialValue: currentRole && currentRole.roleName,
                rules: [{ required: true, message: '请填写角色名称' }],
              })(<Input placeholder="请填写角色名称" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="权限列表">
              {getFieldDecorator('role', {
                initialValue,
                rules: [{ required: true, message: '请选择权限列表' }],
              })(<TreeSelect {...tProps} />)}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={goBack}>
                返回
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default RoleDetail;
