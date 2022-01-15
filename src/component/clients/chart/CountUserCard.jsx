import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

function CountUserCard() {
  const [nbrCustomer, setCNbrCustomer] = useState(0);

  const getCountCustomer = useCallback(
    async () => {
      await axios.get("api/clients/count")
        .then(res => setCNbrCustomer(res.data))
        .catch(err => console.error(err))
    }, [nbrCustomer])

  useEffect(() => {
    getCountCustomer();
  }, [getCountCustomer()])

  return (
    <div className="card bg-primary text-white mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr-3">
            <div className="text-white-95">Nombre du client</div>
            <div className="text-lg font-weight-bold">{nbrCustomer}</div>
          </div>
          <i className="fa fa-users fa-2x" aria-hidden="true"/>
        </div>
      </div>
    </div>
  );
}

export default CountUserCard;
