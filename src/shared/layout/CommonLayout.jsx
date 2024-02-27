const CommonLayout = ({ children, title, subTitle }) => {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="w-2/5 h-full py-10 px-4 grid grid-rows-[auto,1fr] gap-4">
        <div className="grid grid-rows-[auto,auto]">
          <div className="text-base font-normal text-gray-600">
            {subTitle || '이 문제 푸셨나요?'}
          </div>
          <div className="text-2xl font-semibold text-gray-800">{title}</div>
        </div>
        <div className="grid grid-rows-1fr">{children}</div>
      </div>
    </div>
  );
};

export default CommonLayout;
