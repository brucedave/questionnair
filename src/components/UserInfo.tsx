import React from 'react';
import type {FC} from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';

const UserInfo:FC = () => {


    const UserInfo = (
        <>
          <span style={{ color: '#e8e8e8' }}>
            <UserOutlined></UserOutlined>
            nickname
          </span>
          <Button type="link" >
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
    return <div>{0 ? UserInfo : Login}</div>;
};

export default UserInfo;