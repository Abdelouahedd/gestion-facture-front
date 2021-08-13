import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Popconfirm, Space, Table} from 'antd';
import axios from 'axios';
import UpdateClient from './UpdateClient';


const {Column} = Table;

export default function ClientList() {

    const nom = useRef("")
    const [clients, setClients] = useState([])
    const [totalElements, setTotalElements] = useState()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [selectedClient, setSelectedClient] = useState({})

    const getClients = useCallback(
        async () => {
            await axios({
                method: 'GET',
                url: `api/clients?size=${pagination.pageSize}&page=${pagination.current - 1}`,
            })
                .then(res => {
                    setClients(res.data.content);
                    setTotalElements(res.data.totalElements)
                })
                .catch(error => console.log('err -> ', error))
        },
        [pagination],
    );

    const chercherClient = useCallback(
        async (e) => {
            if (e.key === 'Enter') {
                await axios({
                    method: 'GET',
                    url: `api/client?nom=${nom.current.value}`,
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => console.log('err -> ', error))
            }
        },
        [pagination],
    );

    const deleteClient = useCallback(
        async (id) => {
            await axios({
                method: 'DELETE',
                url: `api/client/${id}`,
            })
                .then(res => console.log("data --> ", res))
                .catch(error => console.log('errr -> ', error))
        },
        [],
    )
    const handledeleteClient = async (key) => {
        var dataSource = [...clients];
        dataSource = dataSource.filter((item) => item.id !== key);
        setClients(dataSource);
        await deleteClient(key);
    }

    const editClient = useCallback(
        async (client) => {
            setLoading(true)
            await axios({
                method: 'PUT',
                url: `api/client/${client.id}`,
                data: JSON.stringify(client),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then(res => setLoading(false))
                .catch(error => console.log('errr -> ', error))
        }, [])

    const handlEditClient = async (record) => {
        let client = {...record};
        setSelectedClient(client)
        setVisible(true)
    }

    const updateClient = async (client) => {
        let newClients = clients.map((c) => (c.id === client.id ? client : c))
        console.log("new clients : ", newClients)
        setClients(newClients)
        setVisible(false)
        await editClient(client)
    }

    useEffect(() => {
        getClients()
    }, [getClients]);

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
                                        List des clients
                                    </h1>
                                    <div className="page-header-subtitle">Vous pouvez chercher votre clients par nom
                                        ..
                                    </div>
                                </div>
                                <div className="col-auto mt-4">
                                    <button className="btn btn-block btn-dark">Ajouter nouveau client</button>
                                </div>
                            </div>
                            <div className="page-header-search mt-4">
                                <div className="input-group input-group-joined">
                                    <input className="form-control"
                                           type="text"
                                           placeholder="chercher..."
                                           aria-label="Search"
                                           autoFocus=""
                                           ref={nom}

                                           onKeyPress={(e) => chercherClient(e)}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="feather feather-search"><circle
                                            cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65"
                                                                                 y2="16.65"></line></svg></span>
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
                                            dataSource={clients}
                                            pagination={{
                                                total: totalElements,
                                                current: pagination.current,
                                                pageSize: pagination.pageSize
                                            }}
                                            onChange={e => setPagination(e)}
                                            size="middle"
                                        >
                                            <Column title="ID" dataIndex="id" key="id"/>
                                            <Column
                                                title="Nom"
                                                dataIndex="nom"
                                                key="nom"
                                            />
                                            <Column
                                                title="Prenom"
                                                dataIndex="prenom"
                                                key="prenom"
                                            />

                                            <Column
                                                title="Telephone"
                                                dataIndex="telephone"
                                                key="telephone"
                                            />
                                            <Column
                                                title="Action"
                                                key="action"
                                                render={(text, record) => (
                                                    <Space size="middle">
                                                        <Popconfirm title="Sure to delete?"
                                                                    onConfirm={() => handledeleteClient(record.id)}
                                                        >
                                                            <button className="btn btn-danger">
                                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                            </button>
                                                        </Popconfirm>
                                                        <button className="btn btn-success"
                                                                onClick={() => handlEditClient(record)}>
                                                            <i className="fa fa-edit" aria-hidden="true"></i>
                                                        </button>
                                                    </Space>
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
            <UpdateClient
                client={selectedClient}
                visibility={visible}
                loading={loading}
                update={updateClient}
                cancel={() => setVisible(false)}
            />
        </div>
    )
}
