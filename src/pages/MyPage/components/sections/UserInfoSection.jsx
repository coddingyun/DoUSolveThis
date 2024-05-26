import Card from '../../../../shared/components/Card';

const UserInfoSection = ({ preferType, area, city, language }) => {
  const region = `${area==='ALL'?'전국':area} ${city==='ALL'?'전체':city}`
  return (
    <div className="grid grid-cols-3 gap-8">
      <Card title="온·오프라인" content={preferType} />
      <Card title="지역" content={region} />
      <Card title="언어" content={language} />
    </div>
  );
};

export default UserInfoSection;
