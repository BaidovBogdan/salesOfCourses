import { Button, Card, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../settings/settings';
import { XOutlined } from '@ant-design/icons';

interface ProductCard {
  id: number;
  description: string;
  cap: string;
  sales: number;
  money_sales: number;
  is_active: boolean;
}

export default function WhatDidISell() {
  const { userInfo, logoutUser, authTokens } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [moneyShow, setMoneyShow] = useState('');
  const [products, setProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/card/products/my/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            },
          },
        );
        setProducts(response.data || []); // Ensure it's an array
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]); // Set to empty array on error
      }
    };

    fetchProducts();
  }, [authTokens?.access]);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!authTokens?.access) {
        logoutUser();
      } else {
        try {
          const profileData = await userInfo();
          if (profileData) {
            const money = profileData.rub;
            setMoneyShow(money);
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [authTokens?.access, logoutUser, userInfo]);

  const handleDelete = async (productId: number) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/card/products/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        },
      );

      if (response.status === 204) {
        notification.success({
          message: 'Успех',
          description: 'Продукт успешно удален!',
          placement: 'topRight',
        });

        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productId),
        );
      }
    } catch (error) {
      console.error('Failed to delete product:', error);

      notification.error({
        message: 'Ошибка',
        description: 'Не удалось удалить продукт!',
        placement: 'topRight',
      });
    }
  };

  const handleChangeCourse = async (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    try {
      const updatedProduct = { is_active: !product.is_active }; // Toggle is_active status
      await axios.patch(
        `${BASE_URL}/api/v1/card/products/${productId}/`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
            'Content-Type': 'application/json',
          },
        },
      );

      notification.success({
        message: 'Успех',
        description: 'Статус курса успешно изменен!',
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, is_active: !p.is_active } : p,
        ),
      );
    } catch (error) {
      console.error('Failed to update product status:', error);
    }
  };

  const CardForSell = ({ product }: { product: ProductCard }) => {
    return (
      <div className="p-4">
        <div className="flex flex-col lg:flex-row items-center p-2 rounded-xl bg-black">
          <div className="flex items-center justify-center w-full lg:w-24 h-16 bg-pink-500 rounded-lg mb-4 lg:mb-0">
            <img
              src={BASE_URL + product.cap}
              alt="Product Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow mx-2 h-16 bg-gray-500 rounded-lg flex items-center justify-center mb-4 lg:mb-0">
            <span className="text-white">{product.description}</span>
          </div>
          <div
            className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-green-400 rounded-full mb-4 lg:mb-0 hover:cursor-pointer"
            onClick={() => handleChangeCourse(product.id)}
          >
            <span className="text-white text-center">
              {product.is_active === true ? 'ПРОДАЕТСЯ' : 'СКРЫТО'}
            </span>
          </div>
          <div className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-gray-500 rounded-lg mb-4 lg:mb-0">
            <span className="text-white text-center">
              {product.money_sales} РУБ
            </span>
          </div>
          <div className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-gray-500 rounded-lg mb-4 lg:mb-0">
            <span className="text-white text-center">
              {product.sales} ПРОДАЖ
            </span>
          </div>
          <Button
            onClick={() => handleDelete(product.id)}
            icon={<XOutlined />}
            className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-gray-500 rounded-lg mb-4 lg:mb-0"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <main>
        <div className="flex justify-end p-4 mr-10">
          <div className="flex gap-5 items-center p-4">
            <Button onClick={() => showModal()}>ВЫВОД</Button>
            <span>ОБЩИЙ СЧЕТ: {moneyShow} руб</span>
          </div>
        </div>

        <br />
        <div className="addCard">
          <div className="h-48">
            <div className="mt-10 flex justify-center border-4 border-gray-700 rounded-3xl h-48 items-center">
              <span className="p-4 rounded-2xl hover:bg-gray-700 cursor-pointer">
                <Link to={'/capc'}>+ СОЗДАТЬ НОВЫЙ ПРОДУКТ</Link>
              </span>
            </div>
          </div>
        </div>
        <br />
        <div className="flex flex-col gap-5 mt-5">
          {products && products.length > 0 ? (
            products.map((product) => (
              <CardForSell key={product.id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        <br />
        <footer className="h-48">
          <div className="mt-10 flex justify-center border-4 border-gray-700 rounded-3xl h-48 items-center">
            <span>ПОДВАЛ</span>
          </div>
        </footer>
      </main>
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
        </div>
      </Modal>
    </>
  );
}
