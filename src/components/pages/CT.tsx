import React from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { CarouselRef } from 'antd/lib/carousel'; // Импорт типа CarouselRef

export default function CourseTemplate() {
  const carouselRef = React.useRef<CarouselRef>(null); // Укажите тип для carouselRef

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <>
      <div className="container mx-auto p-4 space-y-11">
        <div
          style={{ backgroundImage: 'url(/Shapka.png)' }}
          className="rounded-xl text-white h-60 p-8 text-center relative bg-cover bg-center"
        >
          <p className="text-2xl">ШАПКА КУРСА</p>
          <div className="absolute h-12 transform -translate-x-1/2 translate-y-40 bg-pink-500 text-white rounded-full py-2 px-4 left-1/2">
            Модуль обратной связи и поддержка
          </div>
        </div>

        <div className="rounded-xl bg-gray-700 text-white p-8 text-center">
          <p className="text-xl">ОПИСАНИЕ</p>
        </div>

        <div className="rounded-xl h-60 bg-gray-700 text-white p-8 text-center relative">
          <Carousel ref={carouselRef} dots={false}>
            <div>
              <h3 className="text-xl">Работа 1</h3>
            </div>
            <div>
              <h3 className="text-xl">Работа 2</h3>
            </div>
            <div>
              <h3 className="text-xl">Работа 3</h3>
            </div>
            <div>
              <h3 className="text-xl">Работа 4</h3>
            </div>
            <div>
              <h3 className="text-xl">Работа 5</h3>
            </div>
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
          <p className="text-xl">НАЗВАНИЕ КУРСА</p>
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
      </div>
      <div className="container mx-auto p-4 space-y-4">
        {/* Фото и информация */}
        <div className="flex justify-center items-center gap-10">
          <div>
            <div className="bg-gray-700 rounded-full w-32 h-32 flex items-center justify-center text-white">
              ФОТО
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-700 rounded-xl p-4 text-white text-center w-40">
              ИМЯ ФАМИЛИЯ
            </div>
            <div className="bg-gray-700 rounded-xl p-4 text-white text-center w-40">
              О СЕБЕ
            </div>
            <div className="flex space-x-4">
              <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                Соц 1
              </div>
              <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                Соц 2
              </div>
              <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                Соц 3
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
    </>
  );
}
