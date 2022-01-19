import React, { useCallback, useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import axios from "axios";


function arrayUnique(array) {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}

function TotalPriceMonth() {

  const [dataBills, setDataBills] = useState([]);
  const [dataPayment, setPayment] = useState([]);
  const [labels, setLabels] = useState([]);

  const getTotalFacturePerMonth = useCallback(
    async () => {
      await axios.get(`api/factures/total/month`)
        .then(res => setDataBills(res.data))
        .catch(err => console.error(err))
    }, []
  )
  useEffect(() => {
    getTotalFacturePerMonth();
  }, [getTotalFacturePerMonth])

  useEffect(() => {
    const monthBills = dataBills.map(bil => bil.month);
    const monthPayments = dataPayment.map(pay => pay.month);
    const months = arrayUnique(monthBills.concat(monthPayments));
    setLabels(months);
  }, [dataBills, dataPayment])

  const getTotalPaymentPerMonth = useCallback(
    async () => {
      await axios.get(`api/virments/total/month`)
        .then(res => setPayment(res.data))
        .catch(err => console.error(err))
    }, []
  )
  useEffect(() => {
    getTotalPaymentPerMonth();
  }, [getTotalPaymentPerMonth])


  return (
    <div className="card card-header-actions h-100">
      <div className="card-header">
        Total des prix par mois (facture/virment)
      </div>
      <div className="card-body">
        <Line
          width={null}
          height={null}
          data={
            {
              labels: labels,
              datasets: [
                {
                  label: "Facture",
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  data: dataBills.map(bil => bil.total),
                  aspectRatio: 0,
                },
                {
                  label: 'Virment',
                  data: dataPayment.map(pay => pay.total),
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235)',
                  aspectRatio: 0,
                },
              ]
            }
          }
          options={
            {

              title: {
                display: true,
                text: 'Line des entrees et sorties',
              },
            
            }
          }
        />
      </div>
    </div>
  );
}

export default TotalPriceMonth;
