import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, message, Modal, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';

import 'antd/dist/antd.css';
import {Context} from "../../../context/userContext";

const {Dragger} = Upload;


export default function InvoiceForm({loading, visibility, facture, add, update, cancel}) {

  const [form] = Form.useForm();
  const {user} = useContext(Context);
  const [document, setDocument] = useState(facture.document)

  const onFinish = async (values) => {
    if (facture.id === 0) {
      let factureRequest = {
        total: values.total,
        documentId: document.id
      }
      await add(factureRequest)
    } else {
      let factureRequest = {
        id: facture.id,
        total: values.total,
        documentId: document.id
      }
      await update(factureRequest)
    }
  }

  const props = {
    name: 'document',
    multiple: false,
    action: 'http://localhost:9000/api/document',
    headers: {
      Authorization: `Bearer ${user.jwt}`
    },
    maxCount: 1,
    defaultFileList: facture?.document.id !== 0 ? [
      {
        uid: '-1',
        name: `Facture num : ${facture.id}`,
        status: 'done',
        url: facture?.document.document
      }
    ] : [],
    onChange(info) {
      const {status} = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setDocument(info.file.response)
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const inputNumberValidator = (rule, value) => {
    let min = rule.min
    const message = rule.message
    if (min != null) min = Number(min)
    try {
      const object = Number(value)
      if (min != null && object < min) throw new Error(message)
      if (isNaN(object)) throw new Error(message)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  useEffect(() => {
    form.setFieldsValue(facture)
  }, [form, facture])


  return (
    <Modal
      title={facture.id !== 0 ? "Mise à jour du Facutre" : "Ajouter une Facutre"}
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
        className="row g-2"
        layout="vertical"
        initialValues={{...facture}}
      >
        <Form.Item
          name="total"
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
                 size="small"
                 addonAfter={<span>DH</span>}
                 min={1}
          />
        </Form.Item>

        <Form.Item
          name="doc"
          className="col-12 py-1"
          rules={[{required: true, message: 'Scan du facture obligatoir!'}]}>
          <Dragger
            {...props}
            /*fileList={[
              facture?.document.id !== 0 ? {
                uid: facture.id,
                name: `Facture num : ${facture.id}`,
                status: 'done',
                url: facture?.document.document
              } : {}
            ]}*/
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>

      </Form>


    </Modal>
  )
}

