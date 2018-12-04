import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MenuTree from './MenusComponent/MenuTree';
import MenuForm from './MenusComponent/MenuForm';
import classes from './Menus.less';

const mapStateToProps = state => ({
  menuList: state.menu.menuList,
  menuCopy: state.menu.menuCopy,
  selectedMenu: state.menu.selectedMenu,
  loading: state.loading.effects['menu/fetchMenuList'],
});

const mapDispatchToProps = dispatch => ({
  onFetchMenuList: () =>
    dispatch({
      type: 'menu/fetchMenuList',
    }),
  onUpdateSelectedMenu: data =>
    dispatch({
      type: 'menu/updateSelectedMenu',
      payload: data,
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Menus extends Component {
  state = {
    type: 'new',
  };

  componentDidMount() {
    const { onFetchMenuList } = this.props;
    onFetchMenuList();
  }

  handleTreeSelected = key => {
    const {
      menuCopy: { menus },
      onUpdateSelectedMenu,
    } = this.props;
    const selectedList = menus.filter(menu => menu.menuId === key[0]);
    onUpdateSelectedMenu(selectedList[0]);
  };

  handleTabChange = activeKey => {
    this.setState({ type: activeKey });
  };

  render() {
    const { menuList, onFetchMenuList, selectedMenu } = this.props;
    const { type } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={classes.Menus}>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <MenuTree
                selectedKeys={(selectedMenu && [selectedMenu.menuId]) || []}
                menus={menuList}
                onSelect={this.handleTreeSelected}
                onRefresh={onFetchMenuList}
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <Tabs type="card" activeKey={type} onChange={this.handleTabChange}>
                <Tabs.TabPane tab="新增菜单" key="new">
                  {type === 'new' ? <MenuForm title="新增菜单" type="new" /> : ''}
                </Tabs.TabPane>
                <Tabs.TabPane tab="编辑菜单" key="edit">
                  {type === 'edit' ? <MenuForm title="编辑菜单" type="edit" /> : ''}
                </Tabs.TabPane>
                <Tabs.TabPane tab="删除菜单" key="delete">
                  {type === 'delete' ? <MenuForm title="删除菜单" type="delete" /> : ''}
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Menus;
