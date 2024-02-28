import Card from '../../../../shared/components/Card';

const UserInfoSection = ({ preferType, area, languages }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <Card title="온/오프라인" content={preferType} />
      <Card title="지역" content={area} />
      <Card title="언어" content={languages.join(', ')} />
    </div>
  );
};

export default UserInfoSection;
