import React, { useEffect, useState } from 'react';
import { Radio, Button, Form, Spin } from 'antd';
import axios from 'axios';
import { useForm } from '../../context/FormProvider';

const Step3 = ({ next }) => {
    const [form] = Form.useForm();
    const { formData, updateForm } = useForm();
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicleTypes = async() => {
            try {
                const res = await axios.get(`http://localhost:3000/api/vehicles`);

                // Filter vehicle types based on wheels value
                const filteredVehicleTypes = res.data.filter(vehicleType => vehicleType.wheels === formData.wheels);
                setVehicleTypes(filteredVehicleTypes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (formData.wheels) {
            fetchVehicleTypes();
        }
    }, [formData.wheels]);

    const onFinish = (values) => {
        updateForm('vehicleType', values.vehicleType);
        next();
    };

    return loading ? ( <
        Spin / >
    ) : ( <
        Form form = { form }
        onFinish = { onFinish }
        initialValues = {
            { vehicleType: formData.vehicleType }
        } >
        <
        Form.Item name = "vehicleType"
        label = "Vehicle Type"
        rules = {
            [{ required: true, message: 'Please select a vehicle type' }]
        } >
        <
        Radio.Group onChange = {
            (e) => form.setFieldsValue({ vehicleType: e.target.value })
        } > {
            vehicleTypes.map((type) => ( <
                Radio key = { type.id }
                value = { type.id } > { type.name } <
                /Radio>
            ))
        } <
        /Radio.Group> < /
        Form.Item >

        <
        Button type = "primary"
        htmlType = "submit" >
        Next <
        /Button> < /
        Form >
    );
};

export default Step3;