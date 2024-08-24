import { useState } from 'react';
import { MenuOutlined, XOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

const Burger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = (key: string) => {
    setIsOpen(false);
  };

  const handleDropdownVisibility = (visible: boolean) => {
    setIsOpen(visible);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          href="#link1"
          className="hover:text-white"
          onClick={() => handleMenuClick('1')}
        >
          Link 1
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          href="#link2"
          className="hover:text-white"
          onClick={() => handleMenuClick('2')}
        >
          Link 2
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          href="#link3"
          className="hover:text-white"
          onClick={() => handleMenuClick('3')}
        >
          Link 3
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement="bottomRight"
      onOpenChange={handleDropdownVisibility} // Управление видимостью дропдауна
    >
      <button className="text-teal-200 hover:text-white focus:outline-none">
        {isOpen ? (
          <XOutlined className="h-8 w-8" aria-hidden="true" />
        ) : (
          <MenuOutlined className="h-8 w-8" aria-hidden="true" />
        )}
      </button>
    </Dropdown>
  );
};

export default Burger;
