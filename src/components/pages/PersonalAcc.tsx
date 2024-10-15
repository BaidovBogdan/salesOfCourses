import { useState, useContext, useEffect } from 'react';
import {
  Button,
  Card,
  Modal,
  Input,
  Form,
  Upload,
  notification,
  Tooltip,
} from 'antd';
import { FaInstagram, FaLink, FaArtstation } from 'react-icons/fa';
import {
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../settings/settings';
import { useTranslation } from 'react-i18next';

export default function PersonalAcc() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [profileForm] = Form.useForm();
  const navigate = useNavigate();

  const { logoutUser, changePassword, authTokens, fetchProfile, userProfile } =
    useContext(AuthContext);

  const showProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  useEffect(() => {
    fetchProfile();
    if (!authTokens) {
      navigate('/login');
      notification.error({
        message: 'Для просмотра личного кабинета нужно авторизоваться',
      });
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      profileForm.setFieldsValue(userProfile);
    }
  }, [userProfile]);

  const handleProfileModalOk = async () => {
    try {
      await profileForm.validateFields();
      const values = profileForm.getFieldsValue();

      if (file) {
        const formData = new FormData();
        formData.append('photo', file);
        for (const key in values) {
          formData.append(key, values[key]);
        }

        await fetch(`${BASE_URL}/api/v1/account/update_user/`, {
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });

        await fetchProfile();

        notification.success({
          message: 'Success',
          description: 'Profile updated successfully!',
        });

        setIsProfileModalOpen(false);
      } else {
        notification.error({
          message: 'Error',
          description: 'Please select a file to upload.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update profile!',
      });
    }
  };

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj);
    } else {
      setFile(null);
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
        notification.error({
          message: 'Error',
          description: 'Both fields are required!',
        });
        return;
      }
      await changePassword(oldPassword, newPassword, newPassword);
      notification.success({
        message: 'Success',
        description: 'Password changed successfully!',
      });
      setOldPassword('');
      setNewPassword('');
      setIsPasswordModalOpen(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to change password!',
      });
    }
  };

  const handlePasswordModalCancel = () => {
    setIsPasswordModalOpen(false);
  };

  const { t } = useTranslation();

  return (
    <main className="px-4 md:px-8">
      <br />
      <div className="flex flex-col lg:flex-row justify-evenly">
        <div className="firstBlock p-4 gap-6 flex flex-col items-center lg:items-start">
          <div className="firstBox">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
              {userProfile?.photo ? (
                <img
                  //@ts-ignore
                  src={userProfile?.photo}
                  alt="Profile"
                  className="w-full h-full rounded-full p-4"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full rounded-full"
                />
              )}

              <Tooltip title={t('personal.titleProfile')}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  className="absolute top-0 right-0"
                  onClick={showProfileModal}
                />
              </Tooltip>
            </div>
            <div className="flex justify-center gap-4">
              <Tooltip title={t('personal.titlePass')}>
                <Button onClick={showPasswordModal}>
                  <LockOutlined />
                </Button>
              </Tooltip>
              <Link to={'/'} className="flex justify-center">
                <Tooltip title={t('personal.logOut')}>
                  <Button onClick={() => logoutUser()}>
                    <LogoutOutlined />
                  </Button>
                </Tooltip>
              </Link>
            </div>
          </div>
          <div>
            <div className="relative w-36 h-8 sm:w-40 sm:h-10 flex items-center">
              <p className="text-center lg:text-left">
                {userProfile?.first_name} {userProfile?.last_name}
              </p>
            </div>
          </div>
          <div>
            <div className="relative w-full sm:w-64 lg:w-72 h-20 sm:h-24 lg:h-28 border-4 border-gray-700 rounded-3xl flex items-center p-4">
              <p className="text-center lg:text-left">
                {userProfile?.description}
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <a
                href={userProfile?.link_to_instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <a
                href={userProfile?.link_to_portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink size={24} />
              </a>
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <a
                href={userProfile?.link_to_artstation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaArtstation size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="secondBox mt-8 lg:mt-0">
          <Link to={'/ms'}>
            <div className="border-4 flex items-center justify-center h-36 sm:h-40 lg:h-48 w-full sm:w-[400px] lg:w-[500px] border-gray-700 rounded-3xl hover:cursor-pointer">
              <span>{t('personal.ms')}</span>
            </div>
          </Link>
          <br />
          <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row justify-around gap-4">
            <Link to={'/wdis'} className="flex justify-center">
              <div className="border-4 flex items-center justify-center h-36 sm:h-40 lg:h-48 w-[150px] sm:w-[170px] lg:w-[190px] border-gray-700 rounded-3xl">
                {t('personal.wdis')}
              </div>
            </Link>
            <div
              onClick={() => showModal()}
              className="border-4 flex items-center justify-center h-36 sm:h-40 lg:h-48 w-[220px] sm:w-[250px] lg:w-[290px] border-gray-700 rounded-3xl cursor-pointer"
            >
              {t('personal.pay')}
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-20 lg:mt-28 flex justify-center h-36 sm:h-40 lg:h-48 items-center border-4 border-gray-700 rounded-3xl">
        <span>{t('personal.footer')}</span>
      </footer>
      <Modal
        title={t('personal.titlePay')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t('personal.ok')}
        cancelText={t('personal.no')}
      >
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer ${
              selectedPayment === 'creditCard' ? 'border-blue-500' : ''
            }`}
            onClick={() => handlePaymentChange('creditCard')}
            bordered={selectedPayment === 'creditCard'}
          >
            <p>{t('personal.cCard')}</p>
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
            <p>{t('personal.bCard')}</p>
          </Card>
        </div>
      </Modal>
      <Modal
        title={t('personal.titlePass')}
        open={isPasswordModalOpen}
        onOk={handlePasswordModalOk}
        onCancel={handlePasswordModalCancel}
        okText={t('personal.ok')}
        cancelText={t('personal.no')}
      >
        <Form>
          <Form.Item
            label={t('personal.lOPas')}
            name="oldPassword"
            rules={[{ required: true, message: t('personal.rOPas') }]}
          >
            <Input.Password
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={t('personal.lPas')}
            name="newPassword"
            rules={[{ required: true, message: t('personal.rPas') }]}
          >
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={t('personal.titleProfile')}
        open={isProfileModalOpen}
        onOk={handleProfileModalOk}
        onCancel={handleProfileModalCancel}
        okText={t('personal.ok')}
        cancelText={t('personal.no')}
      >
        <Form form={profileForm}>
          <Form.Item
            name="photo"
            label={t('personal.lPhoto')}
            valuePropName="file"
            getValueFromEvent={(e: any) => e.fileList}
            rules={[{ required: true, message: t('personal.rPhoto') }]}
          >
            <Upload
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleFileChange}
              showUploadList={true}
            >
              <Button icon={<UploadOutlined />}>{t('personal.uPhoto')}</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={t('personal.lName')}
            name="first_name"
            rules={[{ required: true, message: t('personal.rName') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('personal.lSname')}
            name="last_name"
            rules={[{ required: true, message: t('personal.rSname') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('personal.lDesc')}
            name="description"
            rules={[{ required: true, message: t('personal.rDesc') }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={t('personal.lInst')}
            name="link_to_instagram"
            rules={[
              {
                required: true,
                message: t('personal.rInst'),
                type: 'url',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('personal.lPort')}
            name="link_to_portfolio"
            rules={[
              {
                required: true,
                message: t('personal.rPort'),
                type: 'url',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('personal.lAS')}
            name="link_to_artstation"
            rules={[
              {
                required: true,
                message: t('personal.rAS'),
                type: 'url',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
