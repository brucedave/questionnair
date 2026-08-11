import type { FC } from "react";
import { Typography, Space, Form, Input, Button, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router/constants';
import styles from './Register.module.scss';
import { useRequest } from 'ahooks';
import { registerService } from '../services/user';
const { Title } = Typography;

const Register:FC = () => {
    const navigate = useNavigate();
    const {run: register} = useRequest(
        async(values: any) => {
            const {username, password, nickname} = values;
            const res = await registerService(username, password, nickname);
            return res;
        },
        {
            manual: true,
            onSuccess: res => {
                message.success('注册成功');
                navigate(LOGIN_PATHNAME);
            },
        }
    );
    const Register = (values: any) => {
        console.log('Received values of form: ', values);
        register(values);
    };
    return (
    <div className={styles.container}>
        <div>
            <Space>
                <Title level={2}>
                    <UserAddOutlined />
                </Title>
                <Title level={2}>注册新用户</Title>
            </Space>
        </div>
        <div>
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={Register}>
                <Form.Item 
                label="用户名" 
                name="username"
                rules={[{ required: true, message: '请输入用户名' },
                    {type: 'string', min: 3, max: 20, message: '用户名长度为5-20之间' },
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字、下划线' },
                ]}
                >
                    <Input placeholder="请输入用户名"/>
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password type="password" placeholder="请输入密码"/>
                </Form.Item>
                <Form.Item label="确认密码" name="confirmPassword" dependencies={['password']}
                rules={[{ required: true, message: '请输入确认密码' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(new Error('两次输入的密码不一致'));
                          }
                        },
                      }),
                ]}
                >
                    <Input.Password type="password" placeholder="请输入确认密码"/>
                </Form.Item>
                <Form.Item label="昵称" name="nickname">
                    <Input placeholder="请输入昵称"/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">注册</Button>
                        <Link to={LOGIN_PATHNAME}>已有账号？去登录</Link>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    </div>
    );
};

export default Register;    