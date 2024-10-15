import { useEffect, useRef, useState, useContext } from 'react';
import authContext from '../../context/AuthContext';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL } from '../../settings/settings';
import { useAtom } from 'jotai';
import { idAtom, personalInfoAtom } from '../shared/atoms';
import { FaArtstation, FaInstagram, FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProductCard {
  id: number;
  description: string;
  cap: string;
  sales: number | null;
  money_sales: number | null;
  is_active: boolean;
  name: string;
  price: string;
  images_data: { id: number; authors_work: string }[];
  authors_work?: string[]; // Add this line if 'authors_work' should be a list of strings
}

export default function Preview() {
  const [productCard, setProductCard] = useState<ProductCard | null>(null);
  const [userInfo] = useAtom(personalInfoAtom);
  const [id] = useAtom(idAtom);
  const carouselRef = useRef<any>(null);
  const { authTokens } = useContext(authContext);

  useEffect(() => {
    const fetchProductCard = async () => {
      if (id) {
        try {
          const response = await axios.get<ProductCard>(
            `${BASE_URL}/api/v1/card/products/${id}/`, // Adjust the URL if needed
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
      }
    };
    fetchProductCard();
  }, [id, authTokens]);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  if (!productCard) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <Link to="/capc">
        <div className="flex justify-end p-4">
          <Button className="w-full sm:w-[180px] h-[40px] rounded-xl bg-gray-700 text-white">
            Создать курс!
          </Button>
        </div>
      </Link>
      <div className="container mx-auto p-4 space-y-11">
        <div
          style={{ backgroundImage: `url(${productCard.cap})` }}
          className="rounded-xl text-white h-60 p-8 text-center relative bg-cover bg-center"
        >
          <div className="absolute h-12 transform -translate-x-1/2 translate-y-40 bg-pink-500 text-white rounded-full py-2 px-4 left-1/2">
            WELCOME
          </div>
        </div>

        <div className="rounded-xl bg-gray-700 text-white p-8 text-center">
          <p className="text-xl">{productCard.description}</p>
        </div>

        <div className="rounded-xl h-80 bg-gray-700 text-white p-8 text-center relative">
          <Carousel ref={carouselRef} dots={false} className="image-carousel">
            {productCard.images_data &&
              productCard.images_data.length > 0 &&
              productCard.images_data.map((image) => (
                <div key={image.id} className="carousel-image-wrapper">
                  {image.authors_work ? (
                    <div className="flex justify-center items-center">
                      <img
                        src={image.authors_work}
                        alt={`Product Image ${image.id}`}
                        className="h-[250px] w-full object-cover"
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
          <p className="text-xl">{productCard.name}</p>
        </div>

        <div className="rounded-xl h-60 bg-gray-700 text-white p-8 text-center">
          <p className="text-xl">ОПИСАНИЕ ПРОДУКТА</p>
          <div className="mt-4">
            <Button
              type="primary"
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
                <img src={userInfo?.photo} alt="avatarka" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-700 rounded-xl p-4 text-white text-center w-40">
                {userInfo?.first_name} {userInfo?.last_name}
              </div>
              <div className="bg-gray-700 rounded-xl p-4 text-white text-center w-40">
                {userInfo?.description}
              </div>
              <div className="flex space-x-4">
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <a
                    href={userInfo?.link_to_instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={24} />
                  </a>
                </div>
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <a
                    href={userInfo?.link_to_portfolio || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLink size={24} />
                  </a>
                </div>
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <a
                    href={userInfo?.link_to_artstation || '#'}
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
            <div className="bg-gray-700 h-60 rounded-xl p-8 text-white text-center">
              ОТЗЫВ
            </div>
            <div className="bg-gray-700 h-60 rounded-xl p-8 text-white text-center">
              ОТЗЫВ
            </div>
            <div className="bg-gray-700 h-60 rounded-xl p-8 text-white text-center">
              ОТЗЫВ
            </div>
            <div className="bg-gray-700 h-60 rounded-xl p-8 text-white text-center">
              ОТЗЫВ
            </div>
          </div>
          <div className="bg-gray-700 gap-10 h-72 rounded-xl p-8 flex flex-col text-white justify-end items-center text-center">
            ШАБЛОННЫЙ АРТ
            <Button
              type="primary"
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
    </>
  );
}
