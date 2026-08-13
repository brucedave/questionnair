import React from 'react';
import type {FC} from 'react';
import { Button } from 'antd';
import { Link} from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import useGetUserInfo from '../hooks/useGetUserInfo';
import {useDispatch} from 'react-redux';
import { logoutReducer } from '../store/userReducer';
import { removeToken } from '../utils/user-token';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router/constants';

const UserInfo:FC = () => {
  const {username, nickname } = useGetUserInfo();
  const dispatch = useDispatch();
  const nav = useNavigate();
    const UserInfo = (
        <>
          <span style={{ color: '#e8e8e8' }}>
            <UserOutlined></UserOutlined>
            {nickname}
          </span>
          <Button type="link" onClick={() => {
            dispatch(logoutReducer());
            removeToken();
            nav(LOGIN_PATHNAME);
          }}>
            退出
          </Button>
          ;
        </>
      );
      const Login = (
        <>
          <div className={styles.container}>
            <Link to="/login">登录</Link>
          </div>
        </>
      );
    return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;