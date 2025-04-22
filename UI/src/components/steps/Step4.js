import React, { useEffect, useState } from 'react';
import { Radio, Button, Form, Spin } from 'antd';
import axios from 'axios';
import { useForm } from '../../context/FormProvider';

const Step4 = ({ next }) => {
    const [form] = Form.useForm();
    const { formData, updateForm } = useForm();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch vehicles based on the selected vehicle type
    useEffect(() => {
        const fetchVehicles = async() => {
            setLoading(true); // Start loading

            try {
                // Log formData to ensure vehicleType is set
                console.log('Selected Vehicle Type:', formData.vehicleType);

                // Fetch vehicles from the backend
                const res = await axios.get('http://localhost:3000/api/vehicles');
                console.log('Fetched Data:', res.data); // Log the response

                // Find the vehicle type matching the selected vehicleTypeId
                const selectedVehicleType = res.data.find(
                    (type) => type.id === formData.vehicleType
                );

                // Log selected vehicle type to verify
                console.log('Selected Vehicle Type Data:', selectedVehicleType);

                if (selectedVehicleType && selectedVehicleType.vehicles) {
                    setVehicles(selectedVehicleType.vehicles); // Set the vehicles array for the selected type
                } else {
                    setVehicles([]); // If no vehicles found, set an empty array
                }

            } catch (err) {
                console.error('Error fetching vehicles:', err);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (formData.vehicleType) {
            fetchVehicles(); // Fetch vehicles only if vehicle type is selected
        }
    }, [formData.vehicleType]); // Re-run if vehicleType changes

    const onFinish = (values) => {
        updateForm('vehicleModel', values.vehicleModel);
        next(); // Proceed to the next step
    };

    return loading ? ( <
        Spin / >
    ) : ( <
        Form form = { form }
        onFinish = { onFinish }
        initialValues = {
            { vehicleModel: formData.vehicleModel } } >
        <
        Form.Item name = "vehicleModel"
        label = "Vehicle Model"
        rules = {
            [{ required: true, message: 'Please select a model' }] } >
        <
        Radio.Group onChange = {
            (e) => form.setFieldsValue({ vehicleModel: e.target.value }) } > {
            vehicles.length > 0 ? (
                vehicles.map((model) => ( <
                    Radio key = { model.id }
                    value = { model.id } > { model.name } <
                    /Radio>
                ))
            ) : ( <
                Radio disabled > No vehicles available < /Radio>
            )
        } <
        /Radio.Group> <
        /Form.Item>

        <
        Button type = "primary"
        htmlType = "submit" >
        Next <
        /Button> <
        /Form>
    );
};

export default Step4;