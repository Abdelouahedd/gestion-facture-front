import React, {useEffect} from 'react'
import {Button, Form, Input, Modal} from 'antd';

export default function UpdateClient({loading, visibility, client, update, cancel}) {

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        await update({...values, id: client.id});
        form.resetFields()
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
            forceRender
            footer={[
                <Button key="submit" type="primary"
                        onClick={() => cancel()}>
                    ok
                </Button>
            ]}
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
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-block btn-outline-info col" type="submit">
                                    Mise a jour
                                </button>
                            </div>
                        </div>
                    </div>
                </Form.Item>
            </Form>

        </Modal>
    )
}
