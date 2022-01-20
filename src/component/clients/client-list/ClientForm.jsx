import React, {useEffect} from 'react'
import {Col, Form, Input, Modal, Row} from 'antd';
import {PhoneOutlined} from "@ant-design/icons";

export default function ClientForm({loading, visibility, client, update, add, cancel}) {

  const [form] = Form.useForm();
  const patternValidatePhone = new RegExp(/^[0-9\b]+$/);

  const onFinish = async (values) => {
    if (client.id === 0) {
      let newClient = {
        nom: values.nom,
        prenom: values.prenom,
        telephone: values.telephone
      }
      console.log("client add ", newClient)
      await add(newClient)
    } else {
      await update({...values, id: client.id});
    }
  }

  useEffect(() => {
    form.setFieldsValue(client)
  }, [form, client])

  return (
    <Modal
      title="Mise a jour du client"
      visible={visibility}
      loading={loading}
      onCancel={cancel}
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
        className="g-3"
        layout="vertical"
        initialValues={{...client}}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="nom"
              label={<label htmlFor="inputEmail4" className="form-label">Nom</label>}
              rules={[{required: true, message: 'Nom du client est obligatoir!'}]}
            >
              <Input
                className="py-1 w-100"
                id="inputEmail4"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="prenom"
              label={<label htmlFor="inputPassword4" className="form-label">Prenom</label>}
              rules={[{required: true, message: 'Prenom du client est obligatoir!'}]}
            >
              <Input
                className="py-1 w-100"
                id="inputPassword4"/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="telephone"
          className="col-12"
          label={<label htmlFor="inputAddress" className="form-label">Telephone</label>}
          rules={[{required: true, message: 'Telephone du client est obligatoir!'}
            , {pattern: patternValidatePhone, message: 'Telephone format 0625458963!'}
            , {len: 10, message: 'Telephone ne peut pas dépasser 10 nombre!'}
          ]}
        >
          <Input
            id="inputAddress"
            className="py-1 w-100"
            addonBefore={<span>+212</span>}
            addonAfter={<PhoneOutlined/>}
          />
        </Form.Item>

      </Form>

    </Modal>
  )
}
