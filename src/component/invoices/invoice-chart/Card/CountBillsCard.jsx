import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

function CountBillsCard() {
  const [nbrBills, setNbrBills] = useState(0);

  const getCountBills = useCallback(
    async () => {
      await axios.get("api/factures/count")
        .then(res => setNbrBills(res.data))
        .catch(err => console.error(err))
    }, [])

  useEffect(() => {
    getCountBills();
  }, [getCountBills])

  return (
    <div className="card bg-warning text-white mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr">
            <div className="text-white-95">Nombre de facture</div>
            <div className="text-lg font-weight-bold">{nbrBills}</div>
          </div>
          <i className="fa fa-file-invoice-dollar fa-2x " aria-hidden="true"/>
        </div>
      </div>
    </div>
  );
}

export default CountBillsCard;
