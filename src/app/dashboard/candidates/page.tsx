import CandidatesClient from '@/src/components/dashboard/candidates/CandidatesClient';
import getCandidates from '../../actions/getCandidates';

const CandidatesPage = async () => {
  const candidates = await getCandidates();
  return <CandidatesClient candidates={candidates} />;
};

export default CandidatesPage;
