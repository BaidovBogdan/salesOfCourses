import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const { Title, Text } = Typography;

export default function Login() {
  const { loginUser } = useContext(AuthContext);

  const onFinish = (values: { email: string; password: string }) => {
    console.log('Received values of form: ', values);
    loginUser(values.email, values.password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Title level={3} className="text-center mb-6">
          Вход
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              size="large"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text>
            Нет аккаунта?{' '}
            <Link
              to="/registration"
              className="text-blue-500 hover:text-blue-700"
            >
              Зарегистрироваться
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
