import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useState } from 'react';

const useMyStudy = () => {
  const [switchStatus, setSwitchStatus] = useState(false);

  const { data, isLoading } = useQuery(
    'myStudy',
    async () => {
      const response = await api.get(`/api/mystudies`);
      return response.data;
    },
    {
      select: data => (switchStatus ? data.managements : data.participations),
    },
  );

  return { myStudy: data, isLoading, switchStatus, setSwitchStatus };
};

export default useMyStudy;
