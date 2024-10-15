import { useState } from 'react';
import { MenuOutlined, XOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

const Burger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleMenuClick = (key: string) => {
    setIsOpen(false);

    console.log(`Clicked on item ${key}`);
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
          {t('header.link1')}
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
          {t('header.link2')}
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
          {t('header.link3')}
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement="bottomRight"
      onOpenChange={handleDropdownVisibility}
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
