import { Dropdown, Menu } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const CircleBreadcrumbs = () => {
  const menu = (
    <Menu className="relative">
      <Menu.Item key="1" className="flex justify-center items-center">
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
          <CheckOutlined className="text-teal-500" />
          <span className="ml-2">Y</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="2"
        className="flex justify-center items-center absolute top-12 left-[-30px]"
      >
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
          <CheckOutlined className="text-teal-500" />
          <span className="ml-2">in</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="3"
        className="flex justify-center items-center absolute top-24"
      >
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
          <CheckOutlined className="text-teal-500" />
          <span className="ml-2">TG</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="4"
        className="flex justify-center items-center absolute top-12 left-12"
      >
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
          <CheckOutlined className="text-teal-500" />
          <span className="ml-2">eng</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['hover']} placement="bottomCenter">
      <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center cursor-pointer">
        <span>ПРОФИЛЬ</span>
      </div>
    </Dropdown>
  );
};

export default CircleBreadcrumbs;
