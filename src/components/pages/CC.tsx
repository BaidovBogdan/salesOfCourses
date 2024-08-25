import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function CourserCreate() {
  return (
    <main className="px-4 sm:px-6 md:px-8">
      <br />
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-4xl h-28 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p className="text-sm sm:text-base md:text-lg">
            ДОБАВИТЬ НАЗВАНИЕ УРОКА +
          </p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-2 right-2"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full max-w-4xl">
          <div className="relative w-full sm:w-1/3 h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
            <p className="text-sm sm:text-base md:text-lg">ЗАГРУЗИТЬ ВИДЕО</p>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute top-2 right-2"
            />
          </div>
          <div className="relative w-full sm:w-2/3 h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
            <p className="text-sm sm:text-base md:text-lg">
              ДОБАВИТЬ ОПИСАНИЕ УРОКА +
            </p>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute top-2 right-2"
            />
          </div>
        </div>
        <div className="relative w-full max-w-4xl h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p className="text-sm sm:text-base md:text-lg">
            ЗАГРУЗИТЬ МАТЕРИАЛЫ ДЛЯ УРОКА +++
          </p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-2 right-2"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-4xl">
          <Button className="w-full sm:w-[220px] h-[70px] rounded-xl bg-gray-700 text-white">
            ВЕРНУТЬСЯ К КАРТОЧКИ
          </Button>
          <Button className="w-full sm:w-[220px] h-[70px] rounded-xl bg-gray-700 text-white">
            ДОБАВИТЬ УРОК
          </Button>
          <Button className="w-full sm:w-[220px] h-[70px] rounded-xl bg-gray-700 text-white">
            ОТПРАВИТЬ НА МОДЕРАЦИЮ
          </Button>
        </div>
      </div>
    </main>
  );
}
