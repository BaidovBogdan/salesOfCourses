import { useState, useContext } from 'react';
import { Form, Input, Button, Modal, Typography } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { ForgotPasswordVisible, ResetPasswordVisible } from '../shared/atoms';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useAtom(
    ForgotPasswordVisible,
  );
  const [isResetPasswordVisible, setResetPasswordVisible] =
    useAtom(ResetPasswordVisible);
  const [email, setEmail] = useState<string>('');
  const [resetForm] = Form.useForm();
  const { loginUser, handleForgotPassword, handleForgotPasswordConfirm } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await loginUser(values.email, values.password);
      navigate('/personal');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordVisible(true);
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      await handleForgotPassword(email);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  const handleResetPasswordSubmit = async (values: any) => {
    try {
      await handleForgotPasswordConfirm(
        values.code,
        values.newPassword,
        values.newPasswordConfirm,
      );
    } catch (error) {
      console.error('Reset password error:', error);
    }
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
              loading={loading}
              icon={<LoginOutlined />}
              block
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center flex flex-col gap-6">
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
          <p
            className="text-slate-600 hover:cursor-pointer"
            onClick={handleForgotPasswordClick}
          >
            Забыл пароль?
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        title="Забыли пароль?"
        open={isForgotPasswordVisible}
        onCancel={() => setForgotPasswordVisible(false)}
        onOk={handleForgotPasswordSubmit}
      >
        <Input
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>

      <Modal
        title="Сброс пароля"
        open={isResetPasswordVisible}
        onCancel={() => setResetPasswordVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={resetForm}
          onFinish={handleResetPasswordSubmit}
          layout="vertical"
        >
          <Form.Item
            name="code"
            label="Код сброса"
            rules={[
              { required: true, message: 'Пожалуйста, введите код сброса!' },
            ]}
          >
            <Input placeholder="Введите код сброса" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Новый пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите новый пароль!' },
            ]}
          >
            <Input.Password placeholder="Введите новый пароль" />
          </Form.Item>
          <Form.Item
            name="newPasswordConfirm"
            label="Подтвердите новый пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите новый пароль!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Подтвердите новый пароль" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              size="large"
            >
              Сбросить пароль
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
