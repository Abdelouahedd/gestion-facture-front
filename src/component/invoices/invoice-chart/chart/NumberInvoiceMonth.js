import React, {useCallback, useEffect, useState} from 'react';
import {Select} from "antd";
import {CalendarOutlined} from "@ant-design/icons";
import axios from "axios";
import CustomBar from "./CustomBar";

const {Option} = Select

function NumberInvoiceMonth() {

  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [factureMonth, setFactureMonth] = useState([]);

  const getYearsInvoice = useCallback(
    async () => {
      await axios.get('api/facture/dates')
        .then(res => setYears(res.data))
        .catch(err => console.error(err))
    }, []
  )

  const getNumberFactureByMonth = useCallback(
    async () => {
      await axios.get(`api/facture/month?year=${year}`)
        .then(res => setFactureMonth(res.data))
        .catch(err => console.error(err))
    }, [year]
  )
  useEffect(() => {
    getNumberFactureByMonth();
  }, [getNumberFactureByMonth])

  useEffect(() => {
    getYearsInvoice();
  }, [getYearsInvoice])


  return (
    <div className="card card-header-actions h-100">
      <div className="card-header">
        Le nombre du facture par mois {year}
        <Select
          style={{width: '35%'}}
          placeholder="Choisi l'année "
          allowClear="true"
          size="middle"
          defaultValue={year}
          onChange={(value => setYear(value))}
          suffixIcon={<CalendarOutlined className="text-primary"/>}
        >
          {years.map((y) => <Option value={y} key={y}>{y}</Option>)}
        </Select>
      </div>
      <div className="card-body">
        <CustomBar
          title='Nombre de facture'
          labels={factureMonth.map(f => f.month)}
          data={factureMonth.map(f => f.number)}
        />
        </div>
      </div>
  );
}

export default NumberInvoiceMonth;
