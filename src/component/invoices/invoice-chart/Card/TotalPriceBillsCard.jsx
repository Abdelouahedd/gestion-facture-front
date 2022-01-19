import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {Statistic} from "antd";
import {MoneyCollectOutlined} from "@ant-design/icons";

function TotalPriceBillsCard() {
  const [totalPrice, setTotaPrice] = useState(0);

  const getTotalPriceBills = useCallback(
    async () => {
      await axios.get("api/factures/price")
        .then(res => setTotaPrice(res.data))
        .catch(err => console.error(err))
    }, [])

  useEffect(() => {
    getTotalPriceBills();
  }, [getTotalPriceBills])

  return (
    <div className="card bg-success text-white mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr-3">
            <div className="text-white-95">Total du Facture</div>
            <div className="text-lg font-weight-bold">
              <Statistic valueStyle={{fontSize: 20, color: 'white'}} suffix="DH" value={totalPrice}/>
            </div>
          </div>
          <MoneyCollectOutlined style={{fontSize: '25px'}}/>
        </div>
      </div>
    </div>
  );
}

export default TotalPriceBillsCard;
