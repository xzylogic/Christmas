import React from 'react';
import { Tree, Button } from 'antd';

import classes from '../Menus.less';

const menuTree = props => {
  const { menus, onSelect, onRefresh, selectedKeys } = props;
  let menusTree = '';
  if (menus) {
    menusTree = menus.map(rootMenu => {
      let rootMenuChild = '';
      if (rootMenu.children) {
        rootMenuChild = rootMenu.children.map(menu => {
          let menuChild = '';
          if (menu.children) {
            menuChild = menu.children.map(childMenu => {
              let menuCChild = '';
              if (childMenu.children) {
                menuCChild = childMenu.children.map(cchildMenu => (
                  <Tree.TreeNode title={cchildMenu.name} key={cchildMenu.menuId} />
                ));
              }
              return (
                <Tree.TreeNode title={childMenu.name} key={childMenu.menuId}>
                  {menuCChild}
                </Tree.TreeNode>
              );
            });
          }
          return (
            <Tree.TreeNode title={menu.name} key={menu.menuId}>
              {menuChild}
            </Tree.TreeNode>
          );
        });
      }
      return (
        <Tree.TreeNode title={rootMenu.name} key={rootMenu.menuId}>
          {rootMenuChild}
        </Tree.TreeNode>
      );
    });
  }
  return (
    <div className={classes.MenuTree}>
      <h2>
        菜单列表{' '}
        <Button shape="circle" icon="redo" style={{ marginLeft: '8px' }} onClick={onRefresh} />
      </h2>
      <Tree showLine defaultExpandAll onSelect={onSelect} selectedKeys={selectedKeys}>
        {menusTree}
      </Tree>
    </div>
  );
};

export default menuTree;
