import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function WhatDidISell() {
  const CardForSell = () => {
    return (
      <div className="p-4">
        <div className="flex flex-col lg:flex-row items-center p-2 rounded-xl bg-black">
          <div className="flex items-center justify-center w-full lg:w-24 h-16 bg-pink-500 rounded-lg mb-4 lg:mb-0">
            <span className="text-white">ИКОНКА</span>
          </div>
          <div className="flex-grow mx-2 h-16 bg-gray-500 rounded-lg flex items-center justify-center mb-4 lg:mb-0">
            <span className="text-white">ОПИСАНИЕ</span>
          </div>
          <div className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-green-400 rounded-full mb-4 lg:mb-0">
            <span className="text-white text-center">СКРЫТО/ПРОДАЕТСЯ</span>
          </div>
          <div className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-gray-500 rounded-lg mb-4 lg:mb-0">
            <span className="text-white text-center">15 ПРОДАЖ</span>
          </div>
          <div className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-gray-500 rounded-lg mb-4 lg:mb-0">
            <span className="text-white text-center">5000Р</span>
          </div>
          <Button
            type="primary"
            className="ml-2 w-full lg:w-24 h-16 rounded-lg bg-green-500"
          >
            ВЫВОД
          </Button>
        </div>
      </div>
    );
  };

  return (
    <main>
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
      <div className="flex flex-col gap-5">
        <CardForSell />
        <CardForSell />
      </div>
      <br />
      <footer className="h-48">
        <div className="mt-10 flex justify-center border-4 border-gray-700 rounded-3xl h-48 items-center">
          <span>ПОДВАЛ</span>
        </div>
      </footer>
    </main>
  );
}
