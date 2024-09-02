import { useState, useContext } from 'react';
import { Button, Card, Modal, Input, Form, message } from 'antd';
import {
  CameraOutlined,
  LockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function PersonalAcc() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [profileForm] = Form.useForm();

  const { logoutUser, changePassword, updateProfile } = useContext(AuthContext);

  const showProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalOk = async () => {
    try {
      await profileForm.validateFields();
      const values = profileForm.getFieldsValue();
      await updateProfile(values); // Assuming updateProfile is a function in AuthContext
      message.success('Profile updated successfully!');
      setIsProfileModalOpen(false);
    } catch (error) {
      message.error('Failed to update profile!');
    }
  };

  const handleProfileModalCancel = () => {
    setIsProfileModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePaymentChange = (e: string) => {
    setSelectedPayment(e);
  };

  const showPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordModalOk = async () => {
    try {
      if (!oldPassword || !newPassword) {
        message.error('Both fields are required!');
        return;
      }
      await changePassword(oldPassword, newPassword, newPassword);
      message.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setIsPasswordModalOpen(false);
    } catch (error) {
      message.error('Failed to change password!');
    }
  };

  const handlePasswordModalCancel = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <main className="px-4 md:px-8">
      <br />
      <div className="flex flex-col lg:flex-row justify-evenly">
        <div className="firstBlock p-4 gap-6 flex flex-col items-center lg:items-start">
          <div className="firstBox">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
              <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                className="absolute top-2 right-2"
                onClick={showProfileModal}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={showPasswordModal}>
                <LockOutlined />
              </Button>
              <Link to={'/'} className="flex justify-center">
                <Button onClick={() => logoutUser()}>
                  <LogoutOutlined />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="relative w-36 h-8 sm:w-40 sm:h-10 flex items-center">
              <p className="text-center lg:text-left">Иван Иванов</p>
            </div>
          </div>
          <div>
            <div className="relative w-full sm:w-64 lg:w-72 h-20 sm:h-24 lg:h-28 border-4 border-gray-700 rounded-3xl flex items-center p-4">
              <p className="text-center lg:text-left">о себе</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <p>lorem</p>
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <p>lorem</p>
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <p>lorem</p>
            </div>
          </div>
        </div>
        <div className="secondBox mt-8 lg:mt-0">
          <div className="border-4 flex items-center justify-center h-36 sm:h-40 lg:h-48 w-full sm:w-[400px] lg:w-[500px] border-gray-700 rounded-3xl">
            <span>МОИ ПОКУПКИ</span>
          </div>
          <br />
          <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row justify-around gap-4">
            <Link to={'/wdis'} className="flex justify-center">
              <div className="border-4 flex items-center justify-center h-36 sm:h-40 lg:h-48 w-[150px] sm:w-[170px] lg:w-[190px] border-gray-700 rounded-3xl">
                ЧЕ Я ПРОДАЛ
              </div>
            </Link>
            <div
              onClick={() => showModal()}
              className="border-4 flex items-center justify-center h-36 sm:h-40 lg:h-48 w-[220px] sm:w-[250px] lg:w-[290px] border-gray-700 rounded-3xl cursor-pointer"
            >
              СПОСОБ ОПЛАТЫ
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-20 lg:mt-28 flex justify-center h-36 sm:h-40 lg:h-48 items-center border-4 border-gray-700 rounded-3xl">
        <span>ПОДВАЛ</span>
      </footer>
      <Modal
        title="Выберите способ оплаты"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer ${
              selectedPayment === 'creditCard' ? 'border-blue-500' : ''
            }`}
            onClick={() => handlePaymentChange('creditCard')}
            bordered={selectedPayment === 'creditCard'}
          >
            <p>Кредитная карта</p>
          </Card>
          <Card
            className={`cursor-pointer ${
              selectedPayment === 'paypal' ? 'border-blue-500' : ''
            }`}
            onClick={() => handlePaymentChange('paypal')}
            bordered={selectedPayment === 'paypal'}
          >
            <p>PayPal</p>
          </Card>
          <Card
            className={`cursor-pointer ${
              selectedPayment === 'bankTransfer' ? 'border-blue-500' : ''
            }`}
            onClick={() => handlePaymentChange('bankTransfer')}
            bordered={selectedPayment === 'bankTransfer'}
          >
            <p>Банковский перевод</p>
          </Card>
          <Card
            className={`cursor-pointer ${
              selectedPayment === 'cash' ? 'border-blue-500' : ''
            }`}
            onClick={() => handlePaymentChange('cash')}
            bordered={selectedPayment === 'cash'}
          >
            <p>Наличные</p>
          </Card>
        </div>
      </Modal>
      <Modal
        title="Изменить пароль"
        open={isPasswordModalOpen}
        onOk={handlePasswordModalOk}
        onCancel={handlePasswordModalCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form
          layout="vertical"
          initialValues={{ oldPassword: '', newPassword: '' }}
        >
          <Form.Item
            label="Старый пароль"
            name="oldPassword"
            rules={[{ required: true, message: 'Введите старый пароль!' }]}
          >
            <Input.Password
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Введите старый пароль"
            />
          </Form.Item>
          <Form.Item
            label="Новый пароль"
            name="newPassword"
            rules={[{ required: true, message: 'Введите новый пароль!' }]}
          >
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Редактировать профиль"
        open={isProfileModalOpen}
        onOk={handleProfileModalOk}
        onCancel={handleProfileModalCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={profileForm} layout="vertical">
          <Form.Item
            label="Имя"
            name="first_name"
            rules={[{ required: true, message: 'Введите ваше имя!' }]}
          >
            <Input placeholder="Введите ваше имя" />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="last_name"
            rules={[{ required: true, message: 'Введите вашу фамилию!' }]}
          >
            <Input placeholder="Введите вашу фамилию" />
          </Form.Item>
          <Form.Item label="Фото профиля URL" name="photo">
            <Input placeholder="Введите URL фото профиля" />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <Input.TextArea placeholder="Введите описание" rows={4} />
          </Form.Item>
          <Form.Item label="Портфолио URL" name="link_to_portfolio">
            <Input placeholder="Введите URL портфолио" />
          </Form.Item>
          <Form.Item label="Behance URL" name="link_to_behance">
            <Input placeholder="Введите URL Behance" />
          </Form.Item>
          <Form.Item label="Instagram URL" name="link_to_instagram">
            <Input placeholder="Введите URL Instagram" />
          </Form.Item>
          <Form.Item label="ArtStation URL" name="link_to_artstation">
            <Input placeholder="Введите URL ArtStation" />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
