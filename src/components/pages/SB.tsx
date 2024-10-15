import { BASE_URL } from '../../settings/settings';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Button, Input, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

export default function SuccessBuy() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [review, setReview] = useState<string>('');
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const { id } = useParams<{ id: string }>();

  const buyCourse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Фильтрация уроков по product_card
      const filteredLessons = response.data.results.filter(
        // @ts-ignore
        (lesson: any) => lesson.product_card === +id,
      );

      setLessons(filteredLessons);

      console.log('Покупка прошла успешно:', filteredLessons);
      return filteredLessons; // Возвращаем отфильтрованные данные
    } catch (error: any) {
      console.error(
        'Ошибка при покупке курса:',
        error.response?.data || error.message,
      );
      if (error.response?.status === 401) {
        logoutUser();
      }
      throw error;
    }
  };

  const submitReview = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/comments/`,
        {
          text: review,
          product_card: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens?.access}`,
          },
        },
      );
      if (response.status === 201) {
        notification.success({
          message: 'Спасибо за ваш отзыв!',
        });
        setReview('');
      }
      console.log(id);
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
      console.log(id);
      notification.error({
        message: 'Не удалось отправить отзыв.',
        description: 'Пожалуйста, попробуйте еще раз позже.',
      });
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  useEffect(() => {
    if (authTokens?.access) {
      buyCourse();
    }
  }, [authTokens?.access]);

  return (
    <>
      <div className="container mx-auto p-4 space-y-4">
        {lessons.length > 0 && (
          <>
            <div className="bg-gray-700 rounded-xl p-8 text-white text-center">
              {lessons[currentLessonIndex].lesson_title} + ПРИВЕТСТВИЕ
              ПОКУПАТЕЛЯ
            </div>
            <div className="flex gap-10">
              <div
                className="bg-gray-500 rounded-xl p-8 h-96 text-white text-center w-1/3"
                style={{
                  backgroundImage: `url(${lessons[currentLessonIndex].file})`, // Замените путь на свой
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                ТЕМЫ КУРСА
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="bg-gray-700 rounded-xl p-8 h-60 text-white text-center w-full">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    src={lessons[currentLessonIndex].video} // Замените путь на свой
                    poster={lessons[currentLessonIndex].file} // Обложка для видео
                  />
                </div>
                <div className="bg-gray-700 rounded-xl p-8 h-28 text-white text-center">
                  {lessons[currentLessonIndex].lesson_description} + КОММЕНТАРИИ
                </div>
                <div className="flex justify-center gap-3">
                  <Button
                    className="bg-gray-700 rounded-xl w-1/3 h-10 text-white text-center"
                    onClick={handlePreviousLesson}
                  >
                    ПРОШЛЫЙ УРОК
                  </Button>
                  <Button
                    className="bg-gray-700 rounded-xl w-1/3 h-10 text-white text-center"
                    onClick={handleNextLesson}
                  >
                    СЛЕДУЮЩИЙ УРОК
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center space-x-20">
          <div className="bg-gray-700 rounded-xl p-8 text-white text-center w-1/6 h-40">
            МАТЕРИАЛЫ ДЛЯ СКАЧИВАНИЯ
          </div>
          <div className="bg-gray-700 rounded-xl p-8 text-white text-center w-1/6 h-40">
            МАТЕРИАЛЫ ДЛЯ СКАЧИВАНИЯ
          </div>
        </div>
        <br />
        <div className="flex justify-center gap-2">
          <Input
            placeholder="НАПИШИТЕ ОТЗЫВ!!!"
            className="w-2/3 lg:w-1/3"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button onClick={() => submitReview()} icon={<MailOutlined />} />
        </div>
        <br />
        <div className="bg-gray-700 rounded-xl p-8 text-white text-center">
          ПОДВАЛ
        </div>
      </div>
    </>
  );
}
