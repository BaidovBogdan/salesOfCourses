import { CameraOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Modal } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PersonalAcc() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');

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
              />
            </div>
          </div>
          <div>
            <div className="relative w-36 h-8 sm:w-40 sm:h-10 flex items-center">
              <p className="text-center lg:text-left">Иван Иванов</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-2"
              />
            </div>
          </div>
          <div>
            <div className="relative w-full sm:w-64 lg:w-72 h-20 sm:h-24 lg:h-28 border-4 border-gray-700 rounded-3xl flex items-center p-4">
              <p className="text-center lg:text-left">о себе</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-2"
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <p>lorem</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-0 top-0"
              />
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <p>lorem</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-0 top-0"
              />
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700 rounded-3xl flex items-center justify-center">
              <p>lorem</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-0 top-0"
              />
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
    </main>
  );
}
