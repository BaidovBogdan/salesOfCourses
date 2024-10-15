import { Button, Carousel } from 'antd';
import axios from 'axios';
import { useEffect, useContext, useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../settings/settings';
import AuthContext from '../../context/AuthContext';
import { useAtom } from 'jotai';
import { idAtom, productCardsAtom, Course } from '../shared/atoms';
//@ts-ignore

import type { CarouselRef } from 'antd';
import { useTranslation } from 'react-i18next';

const shuffleArray = (array: any[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

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
}

export default function Home() {
  const { t } = useTranslation();
  const { authTokens } = useContext(AuthContext);
  const [, setProductCardA] = useAtom<Course[]>(productCardsAtom);
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const [, setIdAtom] = useAtom(idAtom);
  const carouselRef = useRef<CarouselRef | null>(null);

  const titleNoProducts = t('home.noResults');

  useEffect(() => {
    const getCoursesAll = async () => {
      try {
        let allProductCards: ProductCard[] = [];
        let nextUrl: any = `${BASE_URL}/api/v1/card/products/`;

        while (nextUrl) {
          const response = await axios.get<{
            count: number;
            next: string | null;
            previous: string | null;
            results: ProductCard[];
          }>(nextUrl);

          const activeProductCards = response.data.results.filter(
            (product) => product.is_active,
          );

          allProductCards.push(...activeProductCards);
          nextUrl = response.data.next;
        }

        //@ts-ignore
        setProductCardA(allProductCards);
        setProductCards(allProductCards);
      } catch (error) {
        console.error('Error fetching product cards:', error);
      }
    };

    getCoursesAll();
  }, [authTokens]);
  console.log(productCards);

  const contentStyle = 'h-64 flex items-center justify-center bg-gray-300';
  const boxStyle =
    'border-4 border-gray-700 w-60 h-36 rounded-3xl flex items-center justify-center';

  const navigate = useNavigate(); // For programmatic navigation

  const handleCourseClick = (id: number) => {
    navigate(`/ct/${id}`);
    setIdAtom(id); // Navigate to CourseTemplate with course ID
  };

  // Shuffle and select the first 9 courses or fallback values if there aren't enough
  const shuffledCourses = useMemo(
    () => shuffleArray(productCards),
    [productCards],
  );

  // Используем перемешанные курсы
  const coursesToDisplay =
    shuffledCourses.length > 0
      ? shuffledCourses
      : [
          { id: 1, name: titleNoProducts },
          { id: 2, name: titleNoProducts },
          { id: 3, name: titleNoProducts },
          { id: 4, name: titleNoProducts },
          { id: 5, name: titleNoProducts },
          { id: 6, name: titleNoProducts },
          { id: 7, name: titleNoProducts },
          { id: 8, name: titleNoProducts },
          { id: 9, name: titleNoProducts },
        ];

  return (
    <>
      <main>
        {productCards.length > 0 ? (
          <div className="firstBlock">
            <div className="relative w-full">
              <Carousel
                ref={carouselRef}
                autoplay
                autoplaySpeed={5000}
                dots={false}
              >
                {productCards
                  .filter((product) => product.images_data.length > 0) // Filter out products without images
                  .map((product, index) => (
                    <div key={index} className={contentStyle}>
                      <img
                        src={product.images_data[0].authors_work}
                        alt={`Image of ${product.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://cdn-icons-png.flaticon.com/512/64/64616.png';
                        }}
                      />
                    </div>
                  ))}
              </Carousel>
              <Button
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={() => carouselRef.current?.prev()} // Navigate to the previous slide
              >
                {'<'}
              </Button>
              <Button
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => carouselRef.current?.next()} // Navigate to the next slide
              >
                {'>'}
              </Button>
              <Button
                type="primary"
                className="absolute bottom-8 left-16 md:left-4 md:bottom-4"
                size="large"
              >
                <Link to={'/sb'}>{t('home.btn')}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center">
            <Link to={'/wdis'}>P.S. КУРСОВ НЕТУ!!! (создать) </Link>
          </p>
        )}

        <br />

        <div className="secondBlock flex justify-between flex-wrap md:flex-nowrap md:gap-4 max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:w-1/2">
            <div className="flex gap-4 mb-4 flex-wrap justify-center md:justify-start">
              <div
                onClick={() => handleCourseClick(coursesToDisplay[0]?.id)}
                className={`${boxStyle} md:w-48 md:h-24 sm:w-36 sm:h-20 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[0] && coursesToDisplay[0].name
                  ? coursesToDisplay[0].name
                  : titleNoProducts}
              </div>
              <div
                onClick={() => handleCourseClick(coursesToDisplay[1]?.id)}
                className={`${boxStyle} md:w-48 md:h-24 sm:w-36 sm:h-20 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[1] && coursesToDisplay[1].name
                  ? coursesToDisplay[1].name
                  : titleNoProducts}
              </div>
            </div>
            <div
              onClick={() => handleCourseClick(coursesToDisplay[2]?.id)}
              className="mt-4 border-4 border-gray-700 max-w-2xl w-full h-64 rounded-3xl flex items-center justify-center hover:cursor-pointer"
            >
              {coursesToDisplay[2] && coursesToDisplay[2].name
                ? coursesToDisplay[2].name
                : titleNoProducts}
            </div>
          </div>
          <div className="flex gap-5 flex-wrap md:flex-nowrap md:w-1/2 justify-center">
            <div className="flex flex-col gap-1 md:flex-grow items-center">
              <div
                onClick={() => handleCourseClick(coursesToDisplay[3]?.id)}
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[3] && coursesToDisplay[3].name
                  ? coursesToDisplay[3].name
                  : titleNoProducts}
              </div>
              <div
                onClick={() => handleCourseClick(coursesToDisplay[4]?.id)}
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[4] && coursesToDisplay[4].name
                  ? coursesToDisplay[4].name
                  : titleNoProducts}
              </div>
              <div
                onClick={() => handleCourseClick(coursesToDisplay[5]?.id)}
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[5] && coursesToDisplay[5].name
                  ? coursesToDisplay[5].name
                  : titleNoProducts}
              </div>
            </div>
            <div className="flex flex-col gap-1 md:flex-grow items-center">
              <div
                onClick={() => handleCourseClick(coursesToDisplay[6]?.id)}
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[6] && coursesToDisplay[6].name
                  ? coursesToDisplay[6].name
                  : titleNoProducts}
              </div>
              <div
                onClick={() => handleCourseClick(coursesToDisplay[7]?.id)}
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[7] && coursesToDisplay[7].name
                  ? coursesToDisplay[7].name
                  : titleNoProducts}
              </div>
              <div
                onClick={() => handleCourseClick(coursesToDisplay[8]?.id)}
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16 hover:cursor-pointer`}
              >
                {coursesToDisplay[8] && coursesToDisplay[8].name
                  ? coursesToDisplay[8].name
                  : titleNoProducts}
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="thirdBlock mt-10 flex justify-center border-4 border-gray-700 rounded-3xl p-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center max-w-xl text-center">
            <span>{t('home.adv')}</span>
          </div>
        </div>

        <br />
        <br />

        <footer className="h-48">
          <div className="mt-10 flex justify-center border-4 border-gray-700 rounded-3xl h-48 p-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center max-w-xl flex-col text-center">
              <span>{t('home.footer')}</span>
              <Button className="mt-5">{t('home.bye')}</Button>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
