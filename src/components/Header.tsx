import Burger from '../components/shared/Burger';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 h-20">
      <nav className="flex items-center justify-between">
        <div className="flex gap-2">
          <Link to={'/'}>
            <img className="w-24 h-10 border-solid" src="" alt="" />
          </Link>

          <div className="ml-7">
            <Burger />
          </div>
        </div>
        <div>
          <Input />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col text-center mt-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full">tg</div>
            <div className="w-6 h-6 bg-green-500 rounded-full -ml-6">in</div>
            <div className="w-6 h-6 bg-red-500 rounded-full">y</div>
          </div>
          <Link to={'/personal'}>
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
              профиль
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
