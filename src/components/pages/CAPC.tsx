import { Button, Form, Input, Tooltip, Upload, notification } from 'antd';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../settings/settings';
import { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { useAtom } from 'jotai';
import {
  activeBtn,
  courseAtom,
  idAtom,
  productFormAtom,
} from '../shared/atoms';
import { CloudUploadOutlined } from '@ant-design/icons';

export default function CreateAProductCard() {
  const { authTokens } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [capFile, setCapFile] = useState<RcFile | null>(null); // State for cap file
  const [productForm, setProductForm] = useAtom(productFormAtom);
  const [isActive, setIsActive] = useAtom(activeBtn);
  const [, setCourse] = useAtom(courseAtom);
  const [id, setId] = useAtom(idAtom);
  const initialFormState = {
    productName: '',
    productDescription: '',
    productPrice: '',
  };
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);

      // Append each file to FormData
      fileList.forEach((file) => {
        formData.append('authors_work', file);
      });

      // Append cap file if selected
      if (capFile) {
        formData.append('cap', capFile);
      }

      const headers = {
        Authorization: `Bearer ${authTokens?.access}`,
        'Content-Type': 'multipart/form-data', // Ensure the correct content type is set
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/card/products/`,
        formData,
        {
          headers,
        },
      );
      if (response.status === 201) {
        notification.success({
          message: 'КУРС СОЗДАН, НО НЕ АКТИВИРОВАН!!!',
        });
      }
      setCourse(response.data);
      setIsActive((prev) => !prev);
      setId(response.data.id);
    } catch (error) {
      console.error('Error saving product card:', error);
      notification.error({
        message: 'ОШИБКА',
        description: 'Скорее всего из за размера файлов',
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(productForm);
    setFileList(productForm.fileList || []);
    setCapFile(productForm.capFile || null);
  }, []);
  //@ts-ignore
  const onValuesChange = (changedValues) => {
    setProductForm((prev) => ({ ...prev, ...changedValues }));
  };

  const handleFileChange = (info: UploadChangeParam) => {
    const files = info.fileList.map((file) => file.originFileObj); //@ts-ignore
    setFileList(files); //@ts-ignore
    setProductForm((prev) => ({ ...prev, fileList: files }));
  };

  const handleCapFileChange = (info: UploadChangeParam) => {
    const file = info.fileList.length ? info.fileList[0].originFileObj : null; //@ts-ignore
    setCapFile(file); //@ts-ignore
    setProductForm((prev) => ({ ...prev, capFile: file }));
  };

  const handleActiveCard = async () => {
    try {
      const response = await axios.patch(
        `http://95.163.230.217/api/v1/card/products/${id}/`,
        { is_active: true },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens?.access}`,
          },
        },
      );
      if (response.status === 200) {
        notification.success({
          message: 'КУРС АКТИВИРОВАН!!!',
        });
        setIsActive((prev) => !prev); //@ts-ignore
        setProductForm(initialFormState);
        setId(response.data.id);
      }
      navigate('/cc');
    } catch (error) {
      console.error('Error updating card:', error);
      notification.error({
        message: 'ОШИБКА',
        description:
          'Скорее всего из за размера файлов либо некорректные данные',
      });
    }
  };

  const handlePreview = () => {
    if (id == null || id == undefined) {
      notification.error({
        message: 'ОШИБКА',
        description: 'Сначала создайте курс',
      });
    } else {
      navigate('/preview');
    }
  };
  const handleRemove = (file: RcFile) => {
    // Remove the file from the fileList
    setFileList((prevList) => prevList.filter((f) => f.uid !== file.uid));
  };

  return (
    <main>
      <br />
      <div className="">
        {/* Directly place the input fields here instead of modal */}
        <Form
          form={form}
          onValuesChange={onValuesChange}
          layout="vertical"
          initialValues={{
            name: '',
            description: '',
            price: '',
          }}
          className="allCards flex flex-col p-4 items-center gap-10 rounded-lg shadow-md"
          onFinish={handleSave}
        >
          {' '}
          <div className="border-2 border-gray-300 p-4 w-1/2 flex justify-center rounded-lg shadow-md">
            {' '}
            {/* Bordered div for course cap */}
            <Form.Item
              name="cap"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <p className="text-center">Файл шапки курса</p>
              <Upload
                onChange={handleCapFileChange}
                beforeUpload={() => false} // Prevent automatic upload
                onRemove={() => setCapFile(null)}
                maxCount={1}
                listType="picture-card"
                className="flex justify-center"
                fileList={
                  capFile
                    ? [
                        {
                          uid: '1', // Unique ID for the file
                          name: capFile.name,
                          status: 'done', // Mark as done since the file is already uploaded
                          originFileObj: capFile,
                        },
                      ]
                    : []
                }
                accept="image/*,video/*"
              >
                <Tooltip title="Загрузите шапку">
                  <CloudUploadOutlined />
                </Tooltip>
              </Upload>
            </Form.Item>
          </div>
          {/* Responsive grid layout */}
          <div className="border-2 border-gray-300 p-4 w-1/2 rounded-lg shadow-md">
            {' '}
            {/* Bordered div for name */}
            <Form.Item
              name="name"
              label="Название курса"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите название курса',
                },
                {
                  max: 100,
                  message: 'Название курса не должно превышать 100 символов',
                },
                {
                  min: 1,
                  message: 'Название курса должно содержать хотя бы 1 символ',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex w-1/2 gap-5 justify-between ">
            <div className="border-2 border-gray-300 p-4 w-full rounded-lg shadow-md">
              {' '}
              {/* Bordered div for description */}
              <Form.Item
                name="description"
                label="Описание"
                rules={[
                  { required: true, message: 'Пожалуйста, введите описание' },
                  {
                    min: 1,
                    message: 'Описание должно содержать хотя бы 1 символ',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </div>
            <div className="border-2 border-gray-300 p-4 rounded-lg shadow-md">
              {' '}
              {/* Bordered div for price */}
              <Form.Item
                name="price"
                label="Цена курса"
                rules={[
                  { required: true, message: 'Пожалуйста, введите цену курса' },
                  {
                    pattern: /^\d+(\.\d{1,2})?$/,
                    message: 'Введите корректную цену',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-4 w-1/2 flex justify-center rounded-lg shadow-md">
            <Form.Item
              name="authors_work"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <p className="text-center">Файлы работ автора</p>
              <Upload
                multiple
                onChange={handleFileChange}
                beforeUpload={() => false} // Prevent automatic upload
                listType="picture-card"
                fileList={fileList.map((file, index) => ({
                  uid: index,
                  name: file.name,
                  status: 'done', // Mark as done since files are already uploaded
                  originFileObj: file,
                }))}
                onRemove={handleRemove}
                className="flex justify-center"
                accept="image/*,video/*"
              >
                <Tooltip title="Добавить файлы работ автора">
                  <CloudUploadOutlined />
                </Tooltip>
              </Upload>
            </Form.Item>
          </div>
          <div className="flex justify-center flex-col gap-4">
            <Button type="primary" htmlType="submit" block loading={isActive}>
              Сохранить курс
            </Button>
            <span
              className="text-slate-800 text-center hover:cursor-pointer"
              onClick={() => setIsActive(false)}
            >
              сбросить загрузку
            </span>
          </div>
        </Form>

        <div className="flex mt-10 flex-col lg:flex-row justify-center gap-4 w-full">
          <Button
            onClick={() => handlePreview()}
            className="w-full lg:w-[220px] h-[70px] rounded-xl bg-gray-700"
          >
            ПРЕВЬЮ
          </Button>

          <Button
            onClick={() => handleActiveCard()}
            className="w-full lg:w-[220px] h-[70px] rounded-xl bg-gray-700"
          >
            ПЕРЕЙТИ К СОЗДАНИЮ КУРСА
          </Button>
        </div>
      </div>
      <br />
      <footer className="mt-11 flex items-center justify-center border-gray-700 border-4 rounded-3xl h-40">
        <p>подвал</p>
      </footer>
    </main>
  );
}
