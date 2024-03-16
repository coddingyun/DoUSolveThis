import useGetManagementStudy from '../../shared/hooks/api/useGetManagementStudy';
import StudyCardForManagerChange from './components/StudyCardForManagerChange';

const ManagerChange = () => {
  const { data } = useGetManagementStudy(() => {}, true);

  return (
    <div className="pt-[80px]">
      <div className="px-24">
        <div className="py-5 mb-8">
          <h1 className="font-semibold text-4xl text-gray-900 my-1">
            서비스 탈퇴
          </h1>
          <h2 className="text-base text-gray-500">
            그동안 내가 관리했던 스터디의 새로운 스터디장을 지정해야 서비스
            탈퇴가 가능합니다.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {data &&
            data.map((item, idx) => (
              <StudyCardForManagerChange
                key={`StudyCardForManagerChange#${idx}`}
                id={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerChange;
