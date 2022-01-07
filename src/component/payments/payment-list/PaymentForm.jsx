import React, {useCallback, useEffect, useState} from 'react';
import {Col, Form, Input, Modal, Row, Select} from "antd";
import axios from "axios";
import {inputNumberValidator} from "../../invoices/invoice-list/InvoiceForm";

const {Option} = Select

function PaymentForm({loading, visibility, payment, update, add, cancel}) {
  const [form] = Form.useForm();

  const [factures, setFactures] = useState([])
  const [clients, setClients] = useState([])


  const onFinish = async (values) => {
    const virmentRequest = {
      idFacture:values.factureId,
      prix:values.prix
    }
    if (payment.id === 0) {
       await add(virmentRequest)
    } else {
       await update({...values, id: payment.id});
    }
  }
  useEffect(() => {
    form.setFieldsValue(payment)
  }, [form, payment])

  const chercherClient = useCallback(
    async (e) => {
      await axios({
        method: 'GET',
        url: `api/list/clients?q=${e}`,
      })
        .then((res) => setClients(res.data))
        .catch(error => console.log('err -> ', error))
    },
    [],
  );

  const chercherFacture = useCallback(
    async (client) => {
      await axios({
        method: 'GET',
        url: `api/factures/client?q=${client}`,
      })
        .then(res => {
          setFactures(res.data);
        })
        .catch(error => console.log('err -> ', error))
    },
    [],
  );
  const handleChangeClient = async (value) => {
    setFactures([]);
    form.setFieldsValue({factureId: ""})
    await chercherFacture(value)
  };

  return (
    <Modal
      title={payment.id === 0 ? "Ajout du payment" : "Mise a jour du payment"}
      visible={visibility}
      loading={loading}
      onCancel={cancel}
      width={700}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{...payment}}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="factureClientNom"
              label={<label htmlFor="client" className="form-label">Client</label>}
              rules={[{required: true, message: 'Client est obligatoir!'}]}
            >
              <Select
                id="client"
                showSearch
                placeholder="chercher par nom ou prenom du client"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={chercherClient}
                onChange={handleChangeClient}
                notFoundContent={null}
                allowClear="true"
                size="large"
              >
                {clients.map((c) => <Option value={c.nom} key={c.id}>{c.nom + " " + c.prenom}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="factureId"
              label={<label htmlFor="invoice" className="form-label">Facture</label>}
              rules={[{required: true, message: 'Facture est obligatoir!'}]}
            >
              <Select
                id="invoice"
                showSearch
                placeholder="sélectionner une facture"
                size="large"
                autoClearSearchValue={true}
              >
                {factures.map((f) => <Option value={f.id} key={f.id}>#Facture :{f.id}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="prix"
          className="col-12 py-1"
          label={<label htmlFor="inputTotal" className="form-label">Total</label>}
          rules={[{required: true, message: 'Total du facture est obligatoir!'},
            {
              min: 1.0,
              message: "Miniment total du prix est 1 DH",
              validator: inputNumberValidator
            },
          ]}
        >
          <Input id="inputTotal"
                 type="number"
                 className="py-1 w-100"
                 size="large"
                 addonAfter={<span>DH</span>}
                 min={1}
          />
        </Form.Item>
      </Form>

    </Modal>
  );
}

export default PaymentForm;
