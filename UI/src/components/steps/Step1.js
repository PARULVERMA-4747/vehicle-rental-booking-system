import React from 'react';
import { Input, Button, Form } from 'antd';
import { useForm } from '../../context/FormProvider';

const Step1 = ({ next }) => {
  const [form] = Form.useForm();
  const { updateForm } = useForm();

  const onFinish = (values) => {
    updateForm('firstName', values.firstName);
    updateForm('lastName', values.lastName);
    next();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Next</Button>
    </Form>
  );
};

export default Step1;
