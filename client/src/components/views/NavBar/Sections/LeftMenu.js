import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <SubMenu title={<span>Profile</span>}>
      <MenuItemGroup title="Orders">
      </MenuItemGroup>
      <MenuItemGroup title="Settings">
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu