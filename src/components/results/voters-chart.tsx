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
import { ElectionResults } from '@/types';

interface VotersChartProps {
  data: ElectionResults | null;
}

const VotersChart: React.FC<VotersChartProps> = ({ data }) => {
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
    labels: ['Sufragantes', 'Ausentes'],
    datasets: [
      {
        label: 'Electores',
        data: [data?.totalVotes || 0, data?.absentVoters || 0],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut options={options} data={chartData} />;
};

export default VotersChart;
