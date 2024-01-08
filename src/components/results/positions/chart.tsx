import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface VotesBreakdownChartProps {
  totalValidVotes: number;
  totalNullVotes: number;
  totalBlankVotes: number;
}

export const VotesBreakdownChart: React.FC<VotesBreakdownChartProps> = ({
  totalValidVotes,
  totalNullVotes,
  totalBlankVotes,
}) => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
      },
      datalabels: {
        font: {
          weight: 'bold',
        },
        formatter: function (value, context) {
          return (
            (
              (value / (context.chart.getDatasetMeta(0) as any).total) *
              100
            ).toFixed(2) + '%'
          );
        },
      },
    },
  };

  const chartData: ChartData<'doughnut'> = {
    labels: ['Votos válidos', 'Votos nulos', 'Votos blancos'],
    datasets: [
      {
        label: 'Votos',
        data: [totalValidVotes, totalNullVotes, totalBlankVotes],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(145, 132, 190, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(145, 132, 190, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut options={options} data={chartData} />;
};
