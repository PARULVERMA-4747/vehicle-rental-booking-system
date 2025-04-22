import { DatePicker, Form, Button, message } from "antd";
import { useForm } from "../../context/FormProvider";
import axios from "axios";
import { useState } from "react";

const { RangePicker } = DatePicker;

const Step5 = ({ next }) => {
    const [form] = Form.useForm();
    const { formData, updateForm } = useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async(values) => {
        try {
            setLoading(true); // Start loading
            const payload = {
                userId: formData.userId || 1,
                vehicleId: formData.vehicleModel,
                vehicleTypeId: formData.vehicleType,
                wheels: formData.wheels,
                customerName: `${formData.firstName} ${formData.lastName}`, // 👈 Combine names
                startDate: values.dateRange[0].format("YYYY-MM-DD"),
                endDate: values.dateRange[1].format("YYYY-MM-DD"),
            };


            const res = await axios.post("http://localhost:3000/api/book", payload);

            if (res.status === 200 || res.status === 201) {
                message.success("Booking successful!");
                updateForm("dateRange", values.dateRange);
            }
        } catch (err) {
            console.error(err);
            message.error("Booking failed. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return ( <
        Form form = { form }
        onFinish = { onFinish } >
        <
        Form.Item name = "dateRange"
        label = "Booking Date Range"
        rules = {
            [{ required: true, message: "Please select a date range" }]
        } >
        <
        RangePicker / >
        <
        /Form.Item> <
        Button type = "primary"
        htmlType = "submit"
        loading = { loading } >
        Submit <
        /Button> < /
        Form >
    );
};

export default Step5;