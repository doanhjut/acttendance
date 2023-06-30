import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Checkbox, Form, Input, Modal, Select } from 'antd'
import logoHti from "../assets/logoHti.jpg"
import luffy from "../assets/luffy.png"
import user1 from "../assets/user1.png"
import user2 from "../assets/user2.png"
import user3 from "../assets/user3.png"
import axios from 'axios';

function FormInforCustomer() {
    const { Option } = Select;
    const [form] = Form.useForm();

    const [isModalOpenInforCustomer, setIsModalOpenInforCustomer] = useState(false);
    const [customerVisted, setCustomerVisted] = useState(false);
    const [listImageCustomer, setListImageCustomer] = useState([])

    const onSaveInforCustomer = (imgCustom) => {
        form.setFieldsValue({
            name: imgCustom.name,
            email: imgCustom.email,
            phone: imgCustom.phone,
            address: imgCustom.address,
            department: imgCustom.department,
            product: imgCustom.product
        });
        setCustomerVisted(imgCustom);
        setIsModalOpenInforCustomer(true)

    };

    const handleCancelSaveInforCustomer = () => {
        setIsModalOpenInforCustomer(false);
    };

    const callApiGetListCustomer = () => {
        console.log('====================================');
        console.log('aaaaa');
        console.log('====================================');
        axios.get(`http://127.0.0.1:2004/attendance/customer`)
            .then(res => {
                const persons = res.data.results;
                setListImageCustomer(persons);
            })
            .catch(error => console.log(error));
    }

    const handleOkSaveInforCustomer = (value) => {
        axios.put(`http://127.0.0.1:2004/attendance/customer/${customerVisted.id}`, value)
            .then(res => {
                const persons = res.data;
                setIsModalOpenInforCustomer(false);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        callApiGetListCustomer();
    }, [])

    return (
        <div className='form-infor-customer'>
            <div className='content'>
                <Row>
                    <Col span={24}>
                        <div className='list-imgae-customer'>
                            <div className='head'>
                                <img src={logoHti} alt=''></img>
                                <h2>Danh sách khách tới gian hàng</h2>
                                <p>Chọn khuôn mặt khách hàng trong danh sách các khách hàng tới tham quan</p>
                            </div>
                            <div className='list-iamge'>
                                {
                                    listImageCustomer?.map((imgCustom, index) => {
                                        return (
                                            <img onClick={() => onSaveInforCustomer(imgCustom)} className='customer' src={imgCustom?.image_path[0]} alt='' key={index}></img>
                                        )
                                    })
                                }
                            </div>
                            <Modal title="Thông tin khách hàng" open={isModalOpenInforCustomer} onOk={form.submit} onCancel={handleCancelSaveInforCustomer}>
                                <Form
                                    form={form}
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={handleOkSaveInforCustomer}
                                    onFinishFailed={handleCancelSaveInforCustomer}
                                    layout='vertical'
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Tên khách hàng"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ khách hàng"
                                        name="address"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Đơn vị làm việc"
                                        name="department"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Sản phẩm quan tâm"
                                        name="product"
                                    >
                                        <Select
                                            placeholder="Chọn sản phẩm khách hàng quan tâm"
                                            mode="multiple"
                                            allowClear
                                        >
                                            <Option value="axis">Tích hợp model AI trên Camera và Loa Axis</Option>
                                            <Option value="Attendance">Attendance</Option>
                                            <Option value="HFace">HFace</Option>
                                            <Option value="HVis">HVis</Option>
                                            <Option value="Than">Than</Option>
                                            <Option value="Veronica">Veronica</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FormInforCustomer