import React, { useCallback, useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2"
import axios from "axios";

function NumberInvoiceByStatus() {

  const [data, setData] = useState([]);

  const getNumberInvoicesByStatus = useCallback(
    async () => {
      await axios.get(`api/factures/complete/number`)
        .then(res => setData(res.data))
        .catch(err => console.error(err))
    }, []
  )
  useEffect(() => {
    getNumberInvoicesByStatus();
  }, [getNumberInvoicesByStatus])

  console.log("mounted");

  const option = {
    labels: data.map(d => d.status),
    datasets: [
      {
        label: "Nombre de facture par status",
        fill: false,
        lineTension: 0,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
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
        data: data.map(d => d.number),

      }
    ]
  };
  return (
    <div className="card card-header-actions h-100">
      <div className="card-header">
        Le Nombre du Facture par status
      </div>
      <div className="card-body">
        <Pie
          data={option}
          width={null}
          height={null}
          options={{ aspectRatio: 0, }}
        />
      </div>
    </div>
  );
}

export default NumberInvoiceByStatus;
