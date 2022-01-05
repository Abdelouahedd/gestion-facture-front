import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Col, Popconfirm, Row, Select, Statistic, Table, Tag} from "antd";
import axios from "axios";
import moment from "moment";


const {Column} = Table;
const {Option} = Select

function PaymentList() {
  const client = useRef();
  const [loading, setLoading] = useState(false)
  const [payments, setPayments] = useState([])
  const [totalElements, setTotalElements] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });


  const getPayments = useCallback(
    async () => {
      setLoading(true);
      await axios({
        method: 'GET',
        url: `api/virments?size=${pagination.pageSize}&page=${pagination.current - 1}`,
      })
        .then(res => {
          setPayments(res.data.content);
          setTotalElements(res.data.totalElements)
        })
        .catch(error => console.log('err -> ', error))
      setLoading(false);
    },
    [pagination],
  );
  useEffect(() => {
      getPayments()
    },
    [getPayments])

  const chercherFacture= useCallback(
    async (e) => {
      if (e.key === 'Enter') {
        await axios({
          method: 'GET',
          url: `api/virments?q=${client.current.value}`,
        })
          .then(res => {
            setPayments(res.data.content);
            setTotalElements(res.data.totalElements)
          })
          .catch(error => console.log('err -> ', error))
      }
    },
    [pagination],
  );

  return (
    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gray-500">
          <div className="container">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                           strokeLinecap="round" strokeLinejoin="round"
                           className="feather feather-life-buoy">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/>
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                      </svg>
                    </div>
                    List des payments
                  </h1>
                  <div className="page-header-subtitle">Vous pouvez chercher ..
                    ..
                  </div>
                </div>
                <div className="col-auto mt-4">

                  <button className="btn btn-block btn-dark">
                    <i className="fas fa-cash-register px-2" aria-hidden="true"/>
                    Ajouter nouveau payment
                  </button>
                </div>
              </div>
              <div className="page-header-search mt-4">
                <div className="input-group input-group-joined">
                  <input className="form-control"
                         type="text"
                         placeholder="chercher..."
                         aria-label="Search"
                         autoFocus=""
                         ref={client}
                         onKeyPress={(e) => chercherFacture(e)}
                  />
                  <div className="input-group-append">
                                        <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="feather feather-search"><circle
                                          cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65"
                                                                       y2="16.65"/></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mt-5">
          <div className="row">
            <div className="col-xxl-12 col-xl-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="datatable">
                    <Table
                      dataSource={payments}
                      pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        total: totalElements,
                        current: pagination.current,
                        pageSize: pagination.pageSize
                      }}
                      onChange={e => setPagination(e)}
                      size="small"
                      sticky
                      bordered={true}
                    >

                      <Column title="#Numero"
                              dataIndex="factureId"
                              key="factureId"
                              width="90px"
                      />
                      <Column title="Date facture"
                              dataIndex="factureCreatedDate"
                              key="factureCreatedDate"
                              align="center"
                              render={(text, record) => {
                                return (
                                  <p>{moment(record.factureCreatedDate).format('LL')}</p>
                                )
                              }}
                      />
                      <Column title="Total facture"
                              dataIndex="factureTotal"
                              key="factureTotal"
                              render={(text, record) => {
                                return (
                                  <Statistic valueStyle={{fontSize: 20}} suffix="DH" value={record.factureTotal}/>
                                )
                              }}
                      />
                      <Column title="Nom du client"
                              dataIndex="factureClientNom"
                              key="factureClientNom"
                      />
                      <Column title="Prenom du client"
                              dataIndex="factureClientPrenom"
                              key="factureClientPrenom"
                      />
                      <Column title="Payment"
                              dataIndex="prix"
                              key="prix"
                              render={(text, record) => {
                                return (
                                  <Statistic valueStyle={{fontSize: 20}} suffix="DH" value={record.prix}/>
                                )
                              }}
                      />
                      <Column title="Date du payment"
                              dataIndex="createdDate"
                              key="createdDate"
                              align="center"
                              render={(text, record) => {
                                return (
                                  <p>{moment(record.createdDate).format('LL')}</p>
                                )
                              }}
                      />
                      <Column
                        title="Complete"
                        dataIndex="factureComplete"
                        key="factureComplete"
                        align="center"
                        render={(text, record) => {
                          return record.complete === true ? (
                            <Tag color="green" key={record.id}>
                              Facture complet
                            </Tag>
                          ) : (
                            <Tag color="red" key={record.id}>
                              Facture non complet
                            </Tag>
                          );
                        }}
                      />
                      <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(text, record) => (
                          <Row justify="center" gutter={24}>
                            <Col span={6}>
                              <Popconfirm title="Sure to delete?"
                              >
                                <button className="btn btn-danger btn-sm">
                                  <i className="fa fa-trash" aria-hidden="true"/>
                                </button>
                              </Popconfirm>
                            </Col>
                            <Col span={6}>
                              <button className="btn btn-success btn-sm">
                                <i className="fa fa-edit" aria-hidden="true"/>
                              </button>
                            </Col>
                          </Row>
                        )}
                      />

                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaymentList;
