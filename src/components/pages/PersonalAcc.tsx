import { CameraOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function PersonalAcc() {
  return (
    <main>
      <br />
      <div className="flex justify-evenly">
        <div className="firstBlock p-4 gap-6 flex flex-col">
          <div className="firstBox">
            <div className="relative w-48 h-48">
              <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                className="absolute top-2 right-2"
              />
            </div>
          </div>
          <div>
            <div className="relative w-40 h-10 flex items-center">
              <p>Иван Иванов</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-2"
              />
            </div>
          </div>
          <div>
            <div className="relative w-72 h-28 border-4 border-gray-700 rounded-3xl flex items-center">
              <p>о себе</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-2"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative w-20 h-20 border-4 border-gray-700 rounded-3xl flex items-center">
              <p>lorem</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-0 top-0"
              />
            </div>
            <div className="relative w-20 h-20 border-4 border-gray-700 rounded-3xl flex items-center">
              <p>lorem</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-0 top-0"
              />
            </div>
            <div className="relative w-20 h-20 border-4 border-gray-700 rounded-3xl flex items-center">
              <p>lorem</p>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="absolute right-0 top-0"
              />
            </div>
          </div>
        </div>
        <div className="secondBox">
          <div className="border-4 flex items-center justify-center h-48 w-[500px] border-gray-700 rounded-3xl">
            <span>МОИ ПОКУПКИ</span>
          </div>
          <br />
          <div className="mt-10 flex justify-around">
            <Link to={'/wdis'}>
              <div className="border-4 flex items-center justify-center h-48 w-[190px] border-gray-700 rounded-3xl">
                ЧЕ Я ПРОДАЛ
              </div>
            </Link>
            <div className="border-4 flex items-center justify-center h-48 w-[290px] border-gray-700 rounded-3xl">
              СПОСОБ ОПЛАТЫ
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-28 flex justify-center h-48 items-center border-4 border-gray-700 rounded-3xl">
        <span>ПОДВАЛ</span>
      </footer>
    </main>
  );
}
