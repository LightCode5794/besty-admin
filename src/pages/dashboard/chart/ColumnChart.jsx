import { Column } from '@ant-design/plots';
import { Card } from 'antd';
import React from 'react';

const data = [
  { type: '13/10/2023', value: 100000 },
  { type: '14/10/2023', value: 100000 },
  { type: '15/10/2023', value: 23423000 },
  { type: '16/10/2023', value: 2340000 },
  { type: '17/10/2023', value: 5000000 },
  { type: '18/10/2023', value: 3400000 },
  { type: '19/10/2023', value: 340000 },
  { type: '20/10/2023', value: 340000 },
];

const ColumnChart = () => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type }) => {
        if (type === '10-30分' || type === '30+分') {
          return '#22CBCC';
        }
        return '#2989FF';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return <>
  <Card>

  <Column {...config} />;
  </Card>
  </>
};

export default ColumnChart;

