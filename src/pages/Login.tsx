import { type FC,useEffect } from 'react';
import { Button, Form, Input, Space, Typography,Checkbox,message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME,MANAGE_INDEX_PATHNAME } from '../router/constants';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { loginService } from '../services/user';
import { setToken } from '../utils/user-token';
import styles from './Login.module.scss';

const { Title } = Typography;
const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFormStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}


const Login: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const { username, password } = getUserInfoFormStorage();
    if (username && password) {
      form.setFieldsValue({ username, password, remember: true });
    }
  }, []);

  const {run: login} = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess: (result) => {
        message.success('登录成功');
        const { token='' } = result;
        setToken(token);
        navigate(MANAGE_INDEX_PATHNAME);
      }
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values||{};
    login(username, password);
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFormStorage();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{remember: true}}
        onFinish={onFinish}
        form={form}
        >
          <Form.Item 
          label="用户名"
          name="username" 
          rules={[
            { required: true, message: '请输入用户名' },
            {type: 'string', min: 3, max: 20, message: '用户名长度为3-20位' },
            {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字、下划线' }
          ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item 
          label="密码"
          name="password" 
          rules={[
            { required: true, message: '请输入密码' },
          ]}
          >
            <Input.Password type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
            <Button type="primary" htmlType="submit">登录</Button>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;