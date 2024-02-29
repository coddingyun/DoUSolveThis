import TopNavigation from '../../shared/layout/TopNavigation';
import OfferCard from './components/OfferCard';
import useGetParticipationOffer from './hooks/api/useGetParticipationOffer';
import usePostParticipationConfirm from './hooks/api/usePostPariticipationConfirm';

const ParticipationOffer = () => {
  const { data } = useGetParticipationOffer();
  const mutation = usePostParticipationConfirm();

  const handleClickApprove = (participationId, confirmStatus) => {
    mutation.mutate({
      participationId,
      confirm: confirmStatus,
    });
  };

  return (
    <TopNavigation>
      <div className="px-8 py-10">
        <h1 className="text-gray-900 text-4xl font-bold mb-12">
          참여 제안 보기
        </h1>
        <div className="grid grid-cols-3">
          {data &&
            data.map((item, idx) => (
              <OfferCard
                key={`OfferCard#${idx}`}
                data={item}
                onClick={() => handleClickApprove(item.participationId, true)}
              />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default ParticipationOffer;
