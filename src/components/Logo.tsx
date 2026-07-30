import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/constants';
import styles from './Logo.module.scss';

const { Title } = Typography;

const Logo: FC = () => {
    return (
        <div className={styles.container}>
            <Link to={HOME_PATHNAME}>
                <Space>
                    <Title>
                        <FormOutlined />
                    </Title>
                    <Title >问卷积木</Title>
                </Space>
            </Link>
        </div>
    );
};

export default Logo;