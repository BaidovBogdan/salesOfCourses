import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import authContext from '../../context/AuthContext';
import { BASE_URL } from '../../settings/settings';
import { useNavigate } from 'react-router-dom';

export default function MyShopping() {
  const [courses, setCourses] = useState([]);
  const { authTokens } = useContext(authContext);
  const [, setCoursesResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/course/buy/`, {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`, // Замените authTokens?.access на реальный токен
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        notification.error({ message: 'Ошибка при загрузке данных о курсах!' });
      }
    };

    fetchCourses();
  }, [authTokens]);

  useEffect(() => {
    const fetchCoursesResult = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/courses/`, {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`, // Замените authTokens?.access на реальный токен
          },
        });
        setCoursesResult(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        notification.error({ message: 'Ошибка при загрузке данных о курсах!' });
      }
    };

    fetchCoursesResult();
  }, [authTokens]);

  const CardChange = ({ course }: any) => {
    return (
      <div className="w-1/2">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row items-center p-2 rounded-xl bg-black">
            <div className="flex items-center justify-center w-full lg:w-24 h-16 bg-pink-500 rounded-lg mb-4 lg:mb-0">
              {course.cap ? (
                <img
                  src={`http://95.163.230.217${course.cap}`}
                  alt={`Course Icon ${course.id}`}
                  className="w-10 h-10 object-cover"
                />
              ) : (
                <span className="text-white">ИКОНКА</span>
              )}
            </div>
            <div className="flex-grow mx-2 h-16 bg-gray-500 rounded-lg flex items-center justify-center mb-4 lg:mb-0">
              <span className="text-white">
                {course.description || 'ОПИСАНИЕ'}
              </span>
            </div>

            <div
              onClick={() => navigate(`/sb/${course.id}`)}
              className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-green-400 rounded-full mb-4 lg:mb-0 hover:cursor-pointer"
            >
              <span className="text-white text-xs text-center">
                ПРОДОЛЖИТЬ КАЧАТЬСЯ
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="p-4">
        <div className="header flex items-center justify-between">
          <div className="bg-blue-400 p-4 rounded-2xl">КУПИТЬ ЕЩЕ НИШТЯКИ</div>
          <div className="p-4 rounded-2xl">ПРИВЕТИК! МЫ ТЕБЕ ТАК РАДЫ!</div>
          <div className="bg-blue-400 p-4 rounded-2xl">
            КУПИТЬ КУРС В ПОДАРОК
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          {courses.map((course) => (
            <CardChange //@ts-ignore
              key={course.product_card.id}
              //@ts-ignore
              course={course.product_card}
            />
          ))}
        </div>
      </main>
      <footer className="mt-16 flex justify-center">
        <div className="flex w-full justify-center border-4 border-gray-700 rounded-3xl h-48 items-center">
          <span>ПОДВАЛ</span>
        </div>
      </footer>
    </>
  );
}
