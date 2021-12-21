import React, {useCallback, useEffect, useState} from 'react';
import {Col, Form, Input, message, Popconfirm, Row, Select, Statistic, Table, Tag, Tooltip} from "antd";
import axios from "axios";
import InvoiceForm, {inputNumberValidator} from "./InvoiceForm";
import "./invoice.css"

const {Column} = Table;
const {Option} = Select

function InvoiceList() {
  let initInvoice = {id: 0, document: {id: 0, document: ""}};

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [factures, setFactures] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState(initInvoice)
  const [totalElements, setTotalElements] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });


  const getFactures = useCallback(
    async () => {
      await axios({
        method: 'GET',
        url: `api/factures?size=${pagination.pageSize}&page=${pagination.current - 1}`,
      })
        .then(res => {
          setFactures(res.data.content);
          setTotalElements(res.data.totalElements)
        })
        .catch(error => console.log('err -> ', error))
    },
    [pagination],
  );
  const chercherFacture = useCallback(
    async (q) => {
      await axios({
        method: 'GET',
        url: `api/factures?size=${pagination.pageSize}&page=${pagination.current - 1}&total=${q.total}&complete=${q.complete}`,
      })
        .then(res => {
          setFactures(res.data.content);
          setTotalElements(res.data.totalElements)
        })
        .catch(error => console.log('err -> ', error))
    },
    [pagination],
  );

  useEffect(() => {
    getFactures()
  }, [getFactures]);

  const addInvoice = useCallback(
    async (factureRequest) => {
      setLoading(true)
      await axios({
        method: 'POST',
        url: `api/facture`,
        data: JSON.stringify(factureRequest),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
        .then(res => {
          setLoading(false)
          message.success(`Facture num ${res.data.id} bien ajoutée.`);
          let newInvoices = [...res.data, factures]
          setFactures(newInvoices)
        })
        .catch(error => console.log('errr -> ', error))
    }, [])

  const updateOldInvoice = useCallback(
    async (factureRequest) => {
      setLoading(true)
      await axios({
        method: 'PUT',
        url: `api/facture/${factureRequest.id}`,
        data: JSON.stringify(factureRequest),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
        .then(res => {
          console.log(res)
          console.log("factures : ", factures)
          let bills = factures.map((f) => (res.data.id === f.id ? res.data : f))
          console.log("new bills : ", bills)
          setFactures(bills)
          setLoading(false)
          message.success(`Facture num ${res.data.id} est mis en à jour.`);
        })
        .catch(error => console.log('errr -> ', error))
    }, [])

  const deleteInvoice = useCallback(
    async (id) => {
      setLoading(true)
      await axios({
        method: 'DELETE',
        url: `api/facture/${id}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
        .then((res) => {
          setLoading(false)
          message.success(`Facture num ${id} est supprimé.`);
        })
        .catch(error => {
          message.error(`Error lors de supression du Facture num ${id}.`);
          console.log('errr -> ', error)
          setLoading(false)
        })
    }, []
  )
  const downloadDoc = useCallback(
    async (idDoc) => {
      setLoading(true)
      await axios({
        method: 'GET',
        url: `api/document/${idDoc}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
        .then((res) => {
          console.log(res)
          setLoading(false)
          window.open(res.data.document, '_blank')
        })
        .catch(error => {
          message.error(`Error lors de telecharger document ${idDoc}.`);
          console.log('errr -> ', error)
          setLoading(false)
        })
    }, []
  )

  let addNewInvoice = async (facture) => {
    setVisible(false)
    await addInvoice(facture)
  }
  let updateInvoice = async (facture) => {
    setVisible(false)
    await updateOldInvoice(facture)
  }

  const handleEditInvoice = (record) => {
    let invoice = {...record};
    setSelectedInvoice(invoice);
    setVisible(true)
  }

  const handleDeleteInvoice = async (id) => {
    let bills = factures.filter(f => f.id !== id)
    setFactures([...bills])
    console.log("new Factures", factures)
    await deleteInvoice(id);
  }

  const handleDowloandFile = async (facture) => {
    await downloadDoc(facture.documentId);
  }
  const handeCreateInvoice = () => {
    setSelectedInvoice(initInvoice)
    setVisible(true)
  }

  const onFinish = async (values) => {
    form.resetFields();
    await chercherFacture(values)
  }

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
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="4"></circle>
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                      </svg>
                    </div>
                    List des factures
                  </h1>
                  <div className="page-header-subtitle">Vous pouvez chercher un facture par
                    ..
                  </div>
                </div>
                <div className="col-auto mt-4">

                  <button className="btn btn-block btn-dark" onClick={() => handeCreateInvoice()}>
                    <i className="fa fa-user-plus px-2" aria-hidden="true"></i>
                    Ajouter nouvelle facture
                  </button>
                </div>
              </div>
              <div className="page-header-search mt-4">
                <Form
                  form={form}
                  onFinish={onFinish}
                >
                  <div class="search-bar">
                    <div className="row">
                      <div className="col-8">
                        <Row justify="space-around">
                          <Col span={8}>
                            <Tooltip title="chercher par total du facture :">
                              <Form.Item
                                name="total"
                                rules={[
                                  {
                                    min: 1.0,
                                    message: "Miniment total du prix est 1 DH",
                                    validator: inputNumberValidator
                                  },
                                ]}
                                style={{marginBottom: 0}}
                              >
                                <Input
                                  type="total"
                                  defaultValue=""
                                  placeholder="Entrer un prix : "
                                  id="query"
                                  size="large"
                                  addonAfter={<span>DH</span>}
                                  allowClear="true"
                                />
                              </Form.Item>
                            </Tooltip>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              name="complete"
                              style={{marginBottom: 0}}
                            >
                              <Select allowClear="true" placeholder="Select l'état du fcture" size="large"
                                      style={{width: '200px'}}>
                                <Option value="true">Facture complet</Option>
                                <Option value="false">Facture non complet</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                      <div className="col-4">
                        <Row justify="end">
                          <Col>
                            <button type="submit" style={{
                              border: "none",
                              backgroundColor: " #fff"
                            }}>
                            <span className="input-group-text" id="search">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                   width="24" height="24"
                                   viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   className="feather feather-search">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              </svg>
                            </span>
                            </button>
                          </Col>
                          <Col>
                            <span className="input-group-text" id="refresh" onClick={getFactures}>
                              <i className="fa fa-sync-alt" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Form>
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
                      dataSource={factures}
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
                      <Column title="#Numero" dataIndex="id" key="id" width="100px"/>
                      <Column
                        title="Total"
                        dataIndex="total"
                        align="left"
                        key="total"
                        render={(text, record) => {
                          return (
                            <Statistic valueStyle={{fontSize: 20}} suffix="DH" value={record.total}/>
                          )
                        }}
                      />
                      <Column
                        title="Complete"
                        dataIndex="complete"
                        key="complete"
                        align="center"
                        render={(text, record) => {
                          if (record.complete === true) {
                            return (
                              <Tag color="green" key={record.id}>
                                Prix complet
                              </Tag>
                            )
                          } else {
                            return (
                              <Tag color="red" key={record.id}>
                                Prix non complet
                              </Tag>
                            )
                          }
                        }}
                      />
                      <Column
                        title="Action"
                        key="action"
                        align="center"
                        width="280px"
                        render={(text, record) => (
                          <Row justify="center">
                            <Col span={4}>
                              <Popconfirm title="Sure to delete?"
                              >
                                <button className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteInvoice(record.id)}>
                                  <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </Popconfirm>
                            </Col>
                            <Col span={4}>
                              <button className="btn btn-success btn-sm" onClick={() => handleEditInvoice(record)}>
                                <i className="fa fa-edit" aria-hidden="true"></i>
                              </button>
                            </Col>
                            <Col span={4}>
                              <button disabled={record.documentId == null} className="btn btn-primary btn-sm"
                                      onClick={() => handleDowloandFile(record)}>
                                <i className="fa fa-download" aria-hidden="true"></i>
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
      <InvoiceForm
        facture={selectedInvoice}
        visibility={visible}
        loading={loading}
        update={updateInvoice}
        add={addNewInvoice}
        cancel={() => setVisible(false)}
      />
    </div>
  )
    ;
}

export default InvoiceList;
