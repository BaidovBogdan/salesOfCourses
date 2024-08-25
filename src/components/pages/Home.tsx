import { Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';

export default function Home() {
  const contentStyle = 'h-64 flex items-center justify-center bg-gray-300';
  const boxStyle =
    'border-4 border-gray-700 w-60 h-36 rounded-3xl flex items-center justify-center';

  return (
    <>
      <main>
        <div className="firstBlock">
          <div className="relative w-full">
            <Carousel autoplay autoplaySpeed={5000} dots={false}>
              <div className={contentStyle}>
                <p>Slide 1</p>
              </div>
              <div className={contentStyle}>
                <p>Slide 2</p>
              </div>
              <div className={contentStyle}>
                <p>Slide 3</p>
              </div>
              <div className={contentStyle}>
                <p>Slide 4</p>
              </div>
            </Carousel>
            <Button
              type="primary"
              className="absolute bottom-8 left-16 md:left-4 md:bottom-4"
              size="large"
            >
              <Link to={'/sb'}>ХОЧУ</Link>
            </Button>
          </div>
        </div>
        <br />
        <div className="secondBlock flex justify-between flex-wrap md:flex-nowrap md:gap-4 max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:w-1/2">
            <div className="flex gap-4 mb-4 flex-wrap justify-center md:justify-start">
              <div
                className={`${boxStyle} md:w-48 md:h-24 sm:w-36 sm:h-20 w-32 h-16`}
              >
                МЯГКИЙ РЕНДЕР
              </div>
              <div
                className={`${boxStyle} md:w-48 md:h-24 sm:w-36 sm:h-20 w-32 h-16`}
              >
                НЕЙРОСЕТКА
              </div>
            </div>
            <div className="mt-4 border-4 border-gray-700 max-w-2xl w-full h-64 rounded-3xl flex items-center justify-center">
              КУРС ПЕРСОНАЖА
            </div>
          </div>
          <div className="flex gap-5 flex-wrap md:flex-nowrap md:w-1/2 justify-center">
            <div className="flex flex-col gap-1 md:flex-grow items-center">
              <div
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16`}
              >
                ИЛЛЮСТРАЦИЯ
              </div>
              <div
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16`}
              >
                ПОРТРЕТ
              </div>
              <div
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16`}
              >
                МАТЕРИАЛЫ
              </div>
            </div>
            <div className="flex flex-col gap-1 md:flex-grow items-center">
              <div
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16`}
              >
                МАТЧ-3
              </div>
              <div
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16`}
              >
                ЮАЙ
              </div>
              <div
                className={`${boxStyle} md:w-full md:h-32 sm:w-36 sm:h-24 w-32 h-16`}
              >
                ТУТОР
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="thirdBlock mt-10 flex justify-center border-4 border-gray-700 rounded-3xl p-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center max-w-xl text-center">
            <span>
              КАКОЙ-НИБУДЬ РЕКЛАМНЫЙ СЛОГАН ИЛИ ЧТО-ТО ЧТО ОБЪЯСНЯЕТ ЧЕ ТУТ
              ПРОИСХОДИТ. ПРО КЛЕВЫЕ УСЛОВИЯ. ЧТО МОЖНО ВСЕМ, ЧТО МЕНЬШАЯ
              КОМИССИЯ, ЧТО ПРОЕКТ ДЛЯ ХУДОЖНИКОВ. ЗАРАБАТЫВАЙ НА СВОИХ НАВЫКАХ.
              НЕ БОЙСЯ МОНЕТЕЗИРОВАТЬ СВОИ НАВЫКИ
            </span>
          </div>
        </div>
        <br />
        <br />
        <footer className="h-48">
          <div className="mt-10 flex justify-center border-4 border-gray-700 rounded-3xl h-48 p-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center max-w-xl flex-col text-center">
              <span>ПОДВАЛ</span>
              <Button className="mt-5">НАПИШИ НАМ ЧТО НАМ УЛУЧШИТЬ</Button>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
