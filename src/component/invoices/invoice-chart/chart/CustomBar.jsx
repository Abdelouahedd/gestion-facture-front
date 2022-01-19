import React from 'react';
import { Bar } from "react-chartjs-2";


function CustomBar({ title, labels, data }) {

  const option = {
    labels: labels,
    datasets: [
      {
        label: title,
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }
    ]
  };

  return (
    <Bar
      data={option}
      width={null}
      height={null}
      options={{aspectRatio: 0, }}
    />
  );
}

export default CustomBar;
