import React, {useEffect, useState} from 'react'
import {Form, Input, Modal} from 'antd';

export default function UpdateClient({loading, visibility, client, update, cancel}) {

    const [form] = Form.useForm();
    const [user, setUser] = useState(client);

    const onFinish = async (values) => {
        await update({...values, id: client.id});
        form.resetFields()
    }

    useEffect(() => {
        setUser(client)
    }, [client.id])

    useEffect(() => {
        form.setFieldsValue(client)
    }, [form, client])
    return (
        <Modal
            title="Mise a jour du client"
            visible={visibility}
            loading={loading}
            onOk={cancel}
            onCancel={cancel}
            forceRender
        >
            <Form
                form={form}
                className="row g-3"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{...client}}
            >
                <Form.Item
                    name="nom"
                    className="small mb-1 my-4 "
                    label={<label htmlFor="inputEmail4" className="form-label">Nom</label>}
                    rules={[{required: true, message: 'Nom du client est obligatoir!'}]}
                >
                    <Input
                        className="form-control py-2"
                        id="inputEmail4"
                    />
                </Form.Item>

                <Form.Item
                    name="prenom"
                    className="small mb-1 my-4 mx-4"
                    label={<label htmlFor="inputPassword4" className="form-label">Prenom</label>}
                    rules={[{required: true, message: 'Prenom du client est obligatoir!'}]}
                >
                    <Input
                        className="form-control py-2"
                        id="inputPassword4"/>
                </Form.Item>
                <Form.Item
                    name="telephone"
                    className="col-12 py-3"
                    label={<label htmlFor="inputAddress" className="form-label">Telephone</label>}
                    rules={[{required: true, message: 'Telephone du client est obligatoir!'}]}
                >
                    <Input
                        id="inputAddress"
                        className="form-control py-2"
                    />
                </Form.Item>
                <Form.Item>
                    <div className="container">
                        <button className="btn btn-outline-info col align-self-end" type="submit">
                            Mise a jour
                        </button>
                    </div>
                </Form.Item>
            </Form>

        </Modal>
    )
}
