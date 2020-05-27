/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
<<<<<<< Updated upstream
import { Menu } from 'antd';
=======
import { Menu, Icon, Badge } from 'antd';
>>>>>>> Stashed changes
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="app">
          <a href="/register">Registration</a>
        </Menu.Item>        
        <Menu.Item key="mail">
          <a href="/login">Login</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="cart">
          <Badge count={1}>
          <a href="/cart" style={{marginRight:-25, color:'#667777'}}>
            <Icon type="shopping-cart" style={{fontSize:30, marginBottom:4}}></Icon>
          </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

