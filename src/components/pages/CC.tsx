import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function CourserCreate() {
  return (
    <main>
      <br />
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-[850px] h-28 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p>ДОБАВИТЬ НАЗВАНИЕ УРОКА +</p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-0 right-0"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="relative w-[310px] h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
            <p>ЗАГРУЗИТЬ ВИДЕО</p>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute top-0 right-0"
            />
          </div>
          <div className="relative w-[520px] h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
            <p>ДОБАВИТЬ ОПИСАНИЕ УРОКА +</p>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute top-0 right-0"
            />
          </div>
        </div>
        <div className="relative w-[850px] h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p>ЗАГРУЗИТЬ МАТЕРИАЛЫ ДЛЯ УРОКА +++</p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-0 right-0"
          />
        </div>
        <div className="flex justify-center gap-6">
          <Button className="w-[220px] h-[70px] rounded-xl bg-gray-700">
            ВЕРНУТЬСЯ К КАРТОЧКИ
          </Button>
          <Button className="w-[220px] h-[70px] rounded-xl bg-gray-700">
            ДОБАВИТЬ УРОК
          </Button>
          <Button className="w-[220px] h-[70px] rounded-xl bg-gray-700">
            ОТПРАВИТЬ НА МОДЕРАЦИЮ
          </Button>
        </div>
      </div>
    </main>
  );
}
