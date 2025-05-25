import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Legend,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

type Props = {
  labels: string[];
  dataValues: number[];
  title?: string;
};

const DoughnutChart: React.FC<Props> = ({ labels, dataValues, title }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Répartition',
        data: dataValues,
        backgroundColor: [
          '#F87171', // rouge
          '#60A5FA', // bleu
          '#34D399', // vert
          '#FBBF24', // jaune
          '#A78BFA', // violet
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold' as const,
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(0) + '%';
          return percentage;
        },
      },
    },
    cutout: '60%',
  };


  return <div className='flex items-center justify-center w-full h-full'>
    <Doughnut data={data} options={options} />
  </div>
};

export default DoughnutChart;
