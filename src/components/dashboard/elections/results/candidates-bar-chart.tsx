'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { ElectionResultsCandidate } from '@/types';

interface CandidatesBarChartProps {
  positionName: string;
  electionResultsCandidates: ElectionResultsCandidate[] | null;
}

const CandidatesBarChart: React.FC<CandidatesBarChartProps> = ({
  positionName,
  electionResultsCandidates,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: positionName,
      },
    },
  };

  const labels = electionResultsCandidates?.map(
    (electionResultsCandidate) => electionResultsCandidate.name,
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Votos',
        data: electionResultsCandidates?.map(
          (electionResultsCandidate) => electionResultsCandidate.votes,
        ),
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default CandidatesBarChart;
