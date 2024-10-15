import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { useAtom } from 'jotai';
import { loadAtom } from '../shared/atoms';

const { Title, Text } = Typography;

export default function Registration() {
  const { registerUser } = useContext(AuthContext);
  const [load, setLoad] = useAtom(loadAtom);

  const onFinish = (values: {
    email: string;
    password: string;
    password2: string;
  }) => {
    registerUser(values.email, values.password, values.password2);
    setLoad(true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Title level={3} className="text-center mb-6">
          Регистрация
        </Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш email!' },
              { type: 'email', message: 'Неверный формат email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Введите ваш email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш пароль!' },
              {
                min: 8,
                message: 'Пароль должен содержать минимум 8 символов!',
              },
              {
                pattern: /^(?=.*[A-Z]).*$/,
                message:
                  'Пароль должен содержать хотя бы одну заглавную букву!',
              },
              {
                pattern: /^(?=.*\d).*$/,
                message: 'Пароль должен содержать хотя бы одну цифру!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Введите ваш пароль"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password2"
            label="Пароль"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите ваш пароль!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Введите ваш пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              size="large"
              icon={<LoginOutlined />}
              loading={load}
              block
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text>
            Есть аккаунт?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Войти
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
