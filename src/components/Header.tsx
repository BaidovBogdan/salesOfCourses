import { useState } from 'react';
import { Input, Modal } from 'antd';
import {
  SearchOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Burger from '../components/shared/Burger';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-gray-800 h-20">
      <nav className="flex items-center justify-between relative">
        <div className="flex gap-2">
          <Link to={'/'}>
            <img className="w-24 h-10 border-solid" src="" alt="" />
          </Link>

          <div className="ml-7 lg:hidden">
            <Burger />
          </div>

          {/* Links: Visible only on desktop */}
          <div className="hidden lg:flex gap-4">
            <Link to={'/link1'} className="text-teal-200 hover:text-white">
              Link 1
            </Link>
            <Link to={'/link2'} className="text-teal-200 hover:text-white">
              Link 2
            </Link>
            <Link to={'/link3'} className="text-teal-200 hover:text-white">
              Link 3
            </Link>
          </div>
        </div>

        {/* Search Input for Desktop */}
        <div className="hidden lg:flex">
          <Input placeholder="Search..." />
        </div>

        {/* Search Icon for Mobile */}
        <div className="lg:hidden flex items-center">
          <SearchOutlined
            className="text-teal-200 text-xl cursor-pointer hover:text-white"
            onClick={showModal}
          />
        </div>

        {/* Translator Icon */}
        <div className="absolute right-0 top-3 transform -translate-y-1/2 flex items-center">
          <GlobalOutlined className="text-teal-200 text-2xl cursor-pointer hover:text-white" />
        </div>

        <div className="flex items-center gap-1 mr-5">
          <div className="flex flex-col text-center mt-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full">tg</div>
            <div className="w-6 h-6 bg-green-500 rounded-full -ml-6">in</div>
            <div className="w-6 h-6 bg-red-500 rounded-full">y</div>
          </div>
          <Link to={'/personal'}>
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
              <UserOutlined />
            </div>
          </Link>
        </div>
      </nav>

      {/* Modal for search input on Mobile */}
      <Modal
        title="Search"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Input placeholder="Search..." />
      </Modal>
    </header>
  );
}
