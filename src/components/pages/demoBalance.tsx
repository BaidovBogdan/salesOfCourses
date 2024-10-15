import { Button, Input } from 'antd';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../settings/settings';

export default function DemoBalance() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const { logoutUser, loginUser, authTokens } = useContext(AuthContext);

  useEffect(() => {
    logoutUser();
  }, []);

  const payment = () => {
    if (isAuth) {
      try {
        const response = axios.patch(
          `${BASE_URL}/api/v1/users/me/`,
          {
            balance: 1000,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokens?.access}`,
            },
          },
        );
      } catch (error) {}
    }
  };

  const onFinish = async () => {
    try {
      await loginUser(mail, password);
      setIsAuth((prev) => !prev);
    } catch (error) {
      alert('Неправильная почта или пароль');
    }
  };

  return (
    <main>
      <h1 className="text-center">ДЕМОНСТРАЦИЯ ОПЛАТЫ</h1>
      <div className="flex justify-center items-center mt-40">
        {isAuth ? (
          <div>
            Спасибо за покупку, Ваш баланс обновится в ближайшее время <br />
            (Подтвердите пополнение баланса в админ панели)
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-center">АВТОРИЗАЦИЯ</p>
            <div className="flex gap-2 flex-col">
              <Input
                placeholder="ПОЧТА"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <Input
                placeholder="ПАРОЛЬ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={() => onFinish()}>ВХОД</Button>
            </div>
          </div> // Если isAuth === false
        )}
      </div>
    </main>
  );
}
