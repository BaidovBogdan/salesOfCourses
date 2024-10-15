import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import {
  SearchOutlined,
  GlobalOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Burger from '../components/shared/Burger';
import AuthContext from '../context/AuthContext';
import { Course, productCardsAtom } from './shared/atoms';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authTokens } = useContext(AuthContext);
  const [productCardA] = useAtom<Course[]>(productCardsAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Course[]>([]);
  const searchRef = useRef<HTMLDivElement>(null); // Reference for the search input and dropdown

  const changeLanguage = () => {
    const currentLng = i18n.language;
    if (currentLng == 'en') {
      i18n.changeLanguage('ru');
    } else {
      i18n.changeLanguage('en');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setFilteredProducts(productCardA);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filtered = productCardA.filter((product) =>
        product.name.toLowerCase().includes(value),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productCardA);
    }
  };

  const handleFocus = () => {
    setFilteredProducts(productCardA);
  };
  //@ts-ignore
  const handleProductClick = (id: number) => {
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        setSearchTerm('');
        setFilteredProducts([]);
        setIsModalOpen(false);
      }, 100);
    } else {
      setSearchTerm('');
      setFilteredProducts([]); // Close results on product click
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        //@ts-ignore
        !event.target.closest('.ant-modal') // Check if click is outside the modal
      ) {
        setFilteredProducts([]); // Close the dropdown when clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 h-20">
      <nav className="flex items-center justify-between relative">
        <div className="flex gap-2">
          <Link to={'/'}>
            <img
              className="w-24 h-10 border-solid"
              src="https://e7.pngegg.com/pngimages/228/843/png-clipart-computer-icons-learning-education-business-material-miscellaneous-angle.png"
              alt=""
            />
          </Link>

          <div className="ml-7 lg:hidden">
            <Burger />
          </div>

          {/* Links: Visible only on desktop */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link to={'/'} className="text-teal-200 hover:text-white">
              {t('header.link1')}
            </Link>
            <Link to={'/'} className="text-teal-200 hover:text-white">
              {t('header.link2')}
            </Link>
            <Link to={'/'} className="text-teal-200 hover:text-white">
              {t('header.link3')}
            </Link>
          </div>
        </div>

        {/* Search Input for Desktop */}
        {authTokens?.access && (
          <div className="hidden lg:flex flex-col relative" ref={searchRef}>
            <Input
              placeholder={t('header.placeHolder')}
              value={searchTerm}
              onChange={handleSearch}
              onFocus={handleFocus}
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />

            {/* Search Results Dropdown */}
            {searchTerm &&
              (filteredProducts.length > 0 ? (
                <div className="absolute bg-white rounded-lg shadow-lg mt-10 p-2 w-full max-h-60 overflow-y-auto z-10">
                  {filteredProducts.map((product) => (
                    <Link
                      to={`/ct/${product.id.toString()}`}
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="block p-2 hover:bg-gray-100"
                    >
                      <div className="p-2 bg-white shadow-md rounded-md hover:shadow-lg transition duration-200">
                        {product.name}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="absolute bg-white rounded-lg shadow-lg mt-10 p-2 w-full z-10">
                  <div className="text-center text-gray-500">
                    {t('header.noResults')}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Search Icon for Mobile */}
        {authTokens?.access && (
          <div className="lg:hidden flex items-center">
            <SearchOutlined
              className="text-teal-200 text-xl cursor-pointer hover:text-white"
              onClick={showModal}
            />
          </div>
        )}

        {/* Translator Icon */}
        <div
          className="absolute right-0 top-3 transform -translate-y-1/2 flex items-center"
          onClick={() => changeLanguage()}
        >
          <GlobalOutlined className="text-teal-200 text-2xl cursor-pointer hover:text-white" />
        </div>

        <div className="flex items-center gap-1 mr-5">
          <div className="flex flex-col text-center mt-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full">tg</div>
            <div className="w-6 h-6 bg-green-500 rounded-full -ml-6">in</div>
            <div className="w-6 h-6 bg-red-500 rounded-full">y</div>
          </div>
          {authTokens ? (
            <Link to={'/personal'}>
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                <UserOutlined />
              </div>
            </Link>
          ) : (
            <Link to={'/login'}>
              <Button icon={<LoginOutlined />} iconPosition="end">
                {t('header.btn')}
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Modal for search input on Mobile */}
      <Modal
        title={t('header.placeHolder')}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          placeholder={t('header.placeHolder')}
          value={searchTerm}
          prefix={<SearchOutlined />}
          onChange={handleSearch}
        />

        <div className="mt-4">
          {searchTerm &&
            (filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/ct/${product.id.toString()}`}
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="block p-2"
                >
                  <div className="p-2 bg-white shadow-md rounded-md hover:shadow-lg transition duration-200">
                    {product.name}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-500">
                {t('header.noResults')}
              </div>
            ))}
        </div>
      </Modal>
    </header>
  );
}
