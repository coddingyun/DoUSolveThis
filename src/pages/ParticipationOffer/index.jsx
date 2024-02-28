import TopNavigation from '../../shared/layout/TopNavigation';
import OfferCard from './components/OfferCard';

const ParticipationOffer = () => {
  const data = [];

  return (
    <TopNavigation>
      <div className="px-8 py-10">
        <h1>참여 제안 보기</h1>
        <div>
          {data &&
            data.map((item, idx) => (
              <OfferCard key={`OfferCard#${idx}`} data={item} />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default ParticipationOffer;
