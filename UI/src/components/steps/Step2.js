// Step2.js
import React from 'react';
import { Radio, Button, Form } from 'antd';
import { useForm } from '../../context/FormProvider';

const Step2 = ({ next }) => {
  const [form] = Form.useForm();
  const { updateForm } = useForm();

  const onFinish = (values) => {
    updateForm('wheels', values.wheels);
    next();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="wheels"
        label="Number of Wheels"
        rules={[{ required: true, message: 'Please select number of wheels' }]}
      >
        <Radio.Group>
          <Radio value={2}>2</Radio>
          <Radio value={4}>4</Radio>
        </Radio.Group>
      </Form.Item>
      <Button type="primary" htmlType="submit">Next</Button>
    </Form>
  );
};

export default Step2;
