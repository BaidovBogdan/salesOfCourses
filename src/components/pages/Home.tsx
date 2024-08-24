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
              className="absolute bottom-8 left-16"
              size="large"
            >
              <Link to={'/sb'}>ХОЧУ</Link>
            </Button>
          </div>
        </div>
        <br />
        <div className="secondBlock flex justify-evenly">
          <div>
            <div className="flex gap-4">
              <div className={boxStyle}>МЯГКИЙ РЕНДЕР</div>
              <div className={boxStyle}>НЕЙРОСЕТКА</div>
            </div>
            <div className="mt-4 border-4 border-gray-700 max-w-2xl h-64 rounded-3xl flex items-center justify-center">
              КУРС ПЕРСОНАЖА
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-1">
              <div className={boxStyle}>ИЛЛЮСТРАЦИЯ</div>
              <div className={boxStyle}>ПОРТРЕТ</div>
              <div className={boxStyle}>МАТЕРИАЛЫ</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className={boxStyle}>МАТЧ-3</div>
              <div className={boxStyle}>ЮАЙ</div>
              <div className={boxStyle}>ТУТОР</div>
            </div>
          </div>
        </div>
        <br />
        <div className="thirdBlock mt-10 flex justify-center border-4 border-gray-700 rounded-3xl">
          <div className="flex items-center justify-center max-w-xl ">
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
          <div className="mt-10 flex justify-center border-4 border-gray-700 rounded-3xl h-48">
            <div className="flex items-center justify-center max-w-xl flex-col">
              <span>ПОДВАЛ</span>
              <Button className="mt-5">НАПИШИ НАМ ЧТО НАМ УЛУЧШИТЬ</Button>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
