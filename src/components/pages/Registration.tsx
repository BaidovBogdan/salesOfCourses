import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext, useState } from 'react';

const { Title, Text } = Typography;

export default function Registration() {
  const { registerUser } = useContext(AuthContext);
  const [load, setLoad] = useState(false);

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
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш пароль!' },
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
