export default function MyShopping() {
  const CardChange = () => {
    return (
      <div className="w-1/2">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row items-center p-2 rounded-xl bg-black">
            <div className="flex items-center justify-center w-full lg:w-24 h-16 bg-pink-500 rounded-lg mb-4 lg:mb-0">
              <span className="text-white">ИКОНКА</span>
            </div>
            <div className="flex-grow mx-2 h-16 bg-gray-500 rounded-lg flex items-center justify-center mb-4 lg:mb-0">
              <span className="text-white">ОПИСАНИЕ</span>
            </div>
            <div className="mx-2 flex items-center justify-center w-full lg:w-24 h-16 bg-green-400 rounded-full mb-4 lg:mb-0">
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
          <CardChange />
          <CardChange />
          <CardChange />
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
