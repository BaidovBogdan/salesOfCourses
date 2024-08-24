import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function CreateAProductCard() {
  return (
    <main>
      <br />
      <div className="allCards flex flex-col items-center gap-10">
        <div className="relative w-[850px] h-28 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p>ДОБАВИТЬ ШАПКУ КУРСА +</p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-0 right-0"
          />
        </div>
        <div className="relative w-[850px] h-28 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p>ДОБАВИТЬ НАЗВАНИЕ КУРСА +</p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-0 right-0"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="relative w-[520px] h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
            <p>ДОБАВИТЬ ОПИСАНИЕ КУРСА +</p>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute top-0 right-0"
            />
          </div>
          <div className="relative w-[310px] h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
            <p>ДОБАВИТЬ ПРАЙС</p>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute top-0 right-0"
            />
          </div>
        </div>
        <div className="relative w-[850px] h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
          <p>ДОБАВИТЬ РАБОТЫ АВТОРА +++</p>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="absolute top-0 right-0"
          />
        </div>
        <div className="flex justify-center gap-6">
          <Button className="w-[220px] h-[70px] rounded-xl bg-gray-700">
            <Link to={'/ct'}>ПРЕВЬЮ</Link>
          </Button>
          <Button className="w-[220px] h-[70px] rounded-xl bg-gray-700">
            <Link to={'/cc'}>ПЕРЕЙТИ К СОЗДАНИЮ КУРСА</Link>
          </Button>
        </div>
      </div>
      <br />
      <footer className="mt-11 flex items-center justify-center border-gray-700 border-4 rounded-3xl h-40">
        <p>подвал</p>
      </footer>
    </main>
  );
}
