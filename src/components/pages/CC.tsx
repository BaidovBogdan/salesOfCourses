import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Spin, notification } from 'antd';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../settings/settings';
import { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { useAtom } from 'jotai';
import { idAtom } from '../shared/atoms';

type Lesson = {
  id: number;
  lesson_title?: string;
  lesson_description?: string;
  video?: RcFile[]; // Use RcFile for file handling
  file?: RcFile[]; // Use RcFile for file handling
};

export default function CourseCreate() {
  const [lessons, setLessons] = useState<Lesson[]>([{ id: 1 }]); // Array of lesson pages
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const [isLoading, setIsLoading] = useState(false); // Spinner state
  const { authTokens } = useContext(AuthContext);
  const [idA] = useAtom(idAtom);

  const navigate = useNavigate();

  // Function to add a new page
  const addNewPage = () => {
    simulateLoading(() => {
      setLessons((prevLessons) => [
        ...prevLessons,
        { id: prevLessons.length + 1 },
      ]);
      setCurrentPage(lessons.length); // Navigate to the new page
    });
  };

  // Function to delete the current page
  const deletePage = () => {
    if (lessons.length > 1) {
      setLessons((prevLessons) =>
        prevLessons.filter((_, index) => index !== currentPage),
      );
      setCurrentPage((prevPage) => (prevPage === 0 ? 0 : prevPage - 1)); // Adjust the current page index
    }
  };

  // Function to simulate loading when changing pages
  const simulateLoading = (callback: () => void) => {
    setIsLoading(true); // Show spinner
    setTimeout(() => {
      callback();
      setIsLoading(false); // Hide spinner after a delay
    }, 500); // Adjust the delay as needed
  };

  const handleFilesChange = (info: UploadChangeParam) => {
    const updatedLessons = [...lessons];
    updatedLessons[currentPage].file = info.fileList.map(
      (file) => file.originFileObj as RcFile,
    ); // Ensure it's an RcFile
    setLessons(updatedLessons);
  };

  const handleVideosChange = (info: UploadChangeParam) => {
    const updatedLessons = [...lessons];
    updatedLessons[currentPage].video = info.fileList.map(
      (file) => file.originFileObj as RcFile,
    ); // Ensure it's an RcFile
    setLessons(updatedLessons);
  };

  const postCoursesForModeration = async () => {
    setIsLoading(true);
    for (let i = 0; i < lessons.length; i++) {
      try {
        const { lesson_title, lesson_description, file, video } = lessons[i];

        // Create FormData for each lesson
        const formData = new FormData();
        formData.append('lesson_title', lesson_title || ''); // Ensure title is provided
        formData.append('lesson_description', lesson_description || ''); // Ensure description is provided
        formData.append('product_card', idA?.toString() || ''); // Ensure idA is a string

        // Append files to FormData
        file?.forEach((fileItem) => formData.append('file', fileItem));
        video?.forEach((videoItem) => formData.append('video', videoItem));

        // Send data from each lesson in the request body
        const response = await axios.post(
          `${BASE_URL}/api/v1/courses/?page=${i + 1}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            },
          },
        );

        if (response.status === 201) {
          notification.success({
            message: 'КУРС СОЗДАН!!!',
          });
          navigate(`/ct/${response.data.product_card}`);
        }
      } catch (error) {
        console.error('Error posting course for page', i + 1, error);
        notification.error({
          message: 'Ошибка!!!',
          description:
            'Проблема скорее всего в размере файлов или пропущенных данных.',
        });
      }
    }
    setIsLoading(false);
  };

  const handleLessonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Lesson,
  ) => {
    const updatedLessons = [...lessons];
    updatedLessons[currentPage] = {
      ...updatedLessons[currentPage],
      [field]: e.target.value,
    };
    setLessons(updatedLessons);
  };

  return (
    <main className="px-4 sm:px-6 md:px-8">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <Spin size="large" />
        </div>
      )}
      <Form layout="vertical" onFinish={postCoursesForModeration}>
        <br />
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-2 justify-center">
            <p>(Страница {currentPage + 1})</p>
          </div>

          <div className="relative w-full h-28 border-4 border-gray-700 rounded-3xl flex text-center flex-col items-center justify-center">
            <Button
              className="absolute top-0 left-0"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={deletePage}
            />
            <Form.Item
              name={`lesson_title_${currentPage}`}
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input
                value={lessons[currentPage]?.lesson_title || ''}
                onChange={(e) => handleLessonChange(e, 'lesson_title')}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="upload"
            getValueFromEvent={(e) => e.fileList}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-10 w-full">
              <div className="relative sm:w-1/3 h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center lg:w-2/3">
                <Upload
                  multiple
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={handleVideosChange}
                  fileList={lessons[currentPage].video || []}
                  accept="image/*,video/*"
                  maxCount={10}
                >
                  <Button icon={<UploadOutlined />}>Upload Videos</Button>
                </Upload>
              </div>
              <div className="relative w-full sm:w-2/3 h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center lg:w-1/3">
                <Form.Item
                  name={`lesson_description_${currentPage}`}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the description!',
                    },
                  ]}
                >
                  <Input.TextArea
                    value={lessons[currentPage]?.lesson_description || ''}
                    onChange={(e) =>
                      handleLessonChange(e, 'lesson_description')
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <br />
            <br />
            <div className="relative w-full h-60 border-4 border-gray-700 rounded-3xl flex text-center items-center justify-center">
              <Upload
                multiple
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFilesChange}
                fileList={lessons[currentPage].file || []}
                accept="image/*,video/*"
                maxCount={10}
              >
                <Button icon={<UploadOutlined />}>Upload Files</Button>
              </Upload>
            </div>
          </Form.Item>
          <br />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={'/wdis'}>
            <Button className="w-full sm:w-[220px] h-[70px] rounded-xl bg-gray-700 text-white">
              ВЕРНУТЬСЯ К КАРТОЧКИ
            </Button>
          </Link>
          <Button
            className="w-full sm:w-[220px] h-[70px] rounded-xl bg-gray-700 text-white"
            onClick={addNewPage}
          >
            ДОБАВИТЬ СТРАНИЦУ
          </Button>
          <Button
            className="w-full sm:w-[220px] h-[70px] rounded-xl bg-gray-700 text-white"
            onClick={postCoursesForModeration}
          >
            ОТПРАВИТЬ НА МОДЕРАЦИЮ
          </Button>
        </div>
      </Form>
    </main>
  );
}
