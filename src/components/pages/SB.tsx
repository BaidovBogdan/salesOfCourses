export default function SuccessBuy() {
  return (
    <>
      <div className="container mx-auto p-4 space-y-4">
        <div className="bg-gray-700 rounded-xl p-8 text-white text-center">
          НАЗВАНИЕ КУРСА + ПРИВЕТСТВИЕ ПОКУПАТЕЛЯ
        </div>
        <div className="flex gap-10 ">
          <div className="bg-gray-500 rounded-xl p-8 h-96 text-white text-center w-1/3">
            ТЕМЫ КУРСА
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="bg-gray-700 rounded-xl p-8 h-60 text-white text-center w-full">
              ВИДЕО УРОК
            </div>
            <div className="bg-gray-700 rounded-xl p-8 h-28 text-white text-center">
              ОПИСАНИЕ УРОКА + КОММЕНТАРИИ
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-700 rounded-xl w-1/3 h-10  text-white text-center">
                СЛЕДУЮЩИЙ УРОК
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center"></div>
        <div className="flex space-x-20 justify-center">
          <div className="bg-gray-700 rounded-xl p-8 text-white text-center w-1/6 h-40">
            МАТЕРИАЛЫ ДЛЯ СКАЧИВАНИЯ
          </div>
          <div className="bg-gray-700 rounded-xl p-8 text-white text-center w-1/6 h-40">
            МАТЕРИАЛЫ ДЛЯ СКАЧИВАНИЯ
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-8 text-white text-center">
          ПОДВАЛ
        </div>
      </div>
    </>
  );
}
