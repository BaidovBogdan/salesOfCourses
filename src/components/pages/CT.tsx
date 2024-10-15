import { useEffect, useRef, useState, useContext } from 'react';
import authContext from '../../context/AuthContext';
import { Carousel, Button, Modal, notification, Tooltip } from 'antd';
import {
  LeftOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL } from '../../settings/settings';
import { FaArtstation, FaInstagram, FaLink } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { personalInfoAtom } from '../shared/atoms';
import { useAtom } from 'jotai';

interface User {
  id: number;
  last_login: string | null;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  description: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  link_to_artstation: string | null;
  link_to_behance: string | null;
  link_to_instagram: string | null;
  link_to_portfolio: string | null;
  photo: string;
  rub: string;
  user_permissions: any[]; // You can specify the type if you have details
}

// Interface for image data related to a product
interface ImageData {
  id: number;
  authors_work: string; // or more specific type if known
}

interface Comment {
  id: number;
  text: string; // Update from 'content' to 'text'
  product_card: number; // Add this field for completeness
  user: User; // Assuming you need user details
}
// Interface for product card
interface ProductCard {
  id: number;
  description: string;
  cap: string;
  sales: number | null;
  money_sales: number | null;
  is_active: boolean;
  name: string;
  price: string;
  images_data: ImageData[];
  comment: Comment[];
  user: User; // The user information related to the product
}

export default function CourseTemplate() {
  const { id } = useParams<{ id: string }>();
  const [productCard, setProductCard] = useState<ProductCard | null>(null);
  const carouselRef = useRef<any>(null);
  const { authTokens } = useContext(authContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shuffledComments, setShuffledComments] = useState<Comment[]>([]);
  const [personalInfo] = useAtom(personalInfoAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductCard = async () => {
      try {
        const response = await axios.get<ProductCard>(
          `${BASE_URL}/api/v1/card/products/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            },
          },
        );
        setProductCard(response.data);
      } catch (error) {
        console.error('Error fetching product card:', error);
      }
    };
    fetchProductCard();
  }, [id, authTokens]);

  useEffect(() => {
    if (productCard) {
      setShuffledComments(shuffleArray(productCard.comment));
    }
  }, [productCard]);

  const shuffleArray = (array: Comment[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleBuy = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/course/buy/`,
        { product_card: id },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        },
      );

      // Check if the response status indicates success
      if (response.status === 200) {
        // Уведомление об успешной покупке
        notification.success({ message: 'Покупка успешна!' });

        // Redirect to /sb/id after a successful purchase
        navigate(`/sb/${id}`);
      }
    } catch (error) {
      console.error('Error during purchase:', error);

      let errorMessage = 'Произошла ошибка при покупке!';
      //@ts-ignore
      if (error.response) {
        //@ts-ignore
        const { data, status } = error.response;

        if (status === 400 && Array.isArray(data)) {
          errorMessage = data[0] || errorMessage;
        } else if (typeof data === 'string') {
          errorMessage = data;
        } else if (data && data.detail) {
          errorMessage = data.detail;
        }
      }

      notification.error({ message: errorMessage });
    }
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const showModal = () => {
    if (!authTokens) {
      notification.error({
        message: 'Для просмотра курса нужно авторизоваться',
      });
      navigate('/login');
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (!productCard) {
    return <p>Загрузка...</p>;
  }

  const { description, cap, name } = productCard;

  return (
    <>
      <div className="container mx-auto p-4 space-y-11">
        <div
          style={{ backgroundImage: `url(${cap})` }}
          className="rounded-xl text-white h-60 p-8 text-center relative bg-cover bg-center object-cover"
        >
          <div
            onClick={() => showModal()}
            className="absolute h-12 transform -translate-x-1/2 translate-y-40 bg-pink-500 text-white rounded-full py-2 px-4 left-1/2 hover:cursor-pointer"
          >
            WELCOME
          </div>
        </div>

        <div className="rounded-xl bg-gray-700 text-white p-8 text-center">
          <p className="text-xl">{description}</p>
        </div>

        <div className="relative">
          <Carousel ref={carouselRef} dots={false} className="image-carousel">
            {productCard.images_data &&
              productCard.images_data.length > 0 &&
              productCard.images_data.map((image) => (
                <div key={image.id} className="carousel-image-wrapper">
                  {image.authors_work ? (
                    <div className="flex justify-center">
                      <img
                        src={image.authors_work}
                        alt={`Product Image ${image.id}`}
                        className="carousel-image"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <p>No image available</p>
                    </div>
                  )}
                </div>
              ))}
          </Carousel>
          <Button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full py-2 px-4"
            icon={<LeftOutlined />}
            onClick={handlePrev}
          />
          <Button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full py-2 px-4"
            icon={<RightOutlined />}
            onClick={handleNext}
          />
        </div>

        <div className="rounded-xl bg-gray-700 text-white p-8 text-center">
          <p className="text-xl">{name}</p>
        </div>

        <div className="rounded-xl h-60 bg-gray-700 text-white p-8 text-center">
          <p className="text-xl">ОПИСАНИЕ ПРОДУКТА</p>
          <div className="mt-4">
            <Button
              type="primary"
              onClick={() => showModal()}
              className="bg-pink-500 text-white rounded-full mt-32 py-2 px-6"
            >
              ХОЧУ
            </Button>
          </div>
        </div>
        <div className="container mx-auto p-4 space-y-4">
          <div className="flex justify-center items-center gap-10">
            <div>
              <div className="bg-gray-700 rounded-full w-32 h-32 flex items-center justify-center text-white">
                <img
                  src={productCard.user.photo}
                  alt="avatarka"
                  className="rounded-full w-32 h-32 bg-cover bg-center object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-700 rounded-xl p-4 text-white text-center w-40">
                {productCard.user.first_name} {productCard.user.last_name}
              </div>
              <div className="bg-gray-700 rounded-xl p-4 text-white text-center w-40">
                {productCard.user.description}
              </div>
              <div className="flex space-x-4">
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <a
                    href={productCard.user.link_to_instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={24} />
                  </a>
                </div>
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <a
                    href={productCard.user.link_to_portfolio || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLink size={24} />
                  </a>
                </div>
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <a
                    href={productCard.user.link_to_artstation || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaArtstation size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {shuffledComments.length > 0 ? (
              shuffledComments.slice(0, 4).map((comment, id) => (
                <div
                  key={id}
                  className="bg-gray-700 h-60 rounded-xl p-8 text-white text-center"
                >
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <Tooltip className="w-[30px]" title="КОММЕНТАРИИ ОТСУТСТВУЮТ">
                <QuestionCircleOutlined style={{ fontSize: 30 }} />
              </Tooltip>
            )}
          </div>
          <div className="bg-gray-700 gap-10 h-72 rounded-xl p-8 flex flex-col text-white justify-end items-center text-center">
            ШАБЛОННЫЙ АРТ
            <Button
              type="primary"
              onClick={() => showModal()}
              className="bg-pink-500 w-56 h-10 text-white rounded-full py-2 px-6"
            >
              ХОЧУ
            </Button>
          </div>
          <div className="flex justify-center"></div>
          <div className="bg-gray-700 rounded-xl p-8 text-white text-center">
            ПОДВАЛ
          </div>
        </div>
      </div>
      <Modal
        title={productCard.name}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col gap-2">
          <p>Цена курса: {productCard.price} RUB</p>
          <div className="flex justify-between items-center">
            <p>Ваш баланс: {personalInfo?.rub} RUB</p>
            <Link to={''}>
              <Button>
                <PlusCircleOutlined />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-around mt-10 lg:mt-16">
          <Button key="cancel" onClick={handleCancel}>
            Отмена
          </Button>
          ,
          <Button
            key="purchase"
            type="primary"
            onClick={() => handleBuy()}
            className="bg-pink-500 text-white"
          >
            Купить
          </Button>
        </div>
      </Modal>
    </>
  );
}
