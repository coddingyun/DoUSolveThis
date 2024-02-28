import TopNavigation from '../../shared/layout/TopNavigation';
import OfferCard from './components/OfferCard';
import useGetParticipationOffer from './hooks/api/useGetParticipationOffer';

const ParticipationOffer = () => {
  const { data } = useGetParticipationOffer();

  return (
    <TopNavigation>
      <div className="px-8 py-10">
        <h1>참여 제안 보기</h1>
        <div className='grid grid-cols-3'>
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
