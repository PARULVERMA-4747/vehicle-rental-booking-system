import { DatePicker, Form, Button as AntButton, message } from "antd";
import { useForm } from "../../context/FormProvider";
import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const { RangePicker } = DatePicker;

const Step5 = ({ next,goToFirstStep }) => {
  const [form] = Form.useForm();
  const { formData, updateForm } = useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const payload = {
        userId: formData.userId || 1,
        vehicleId: formData.vehicleModel,
        vehicleTypeId: formData.vehicleType,
        wheels: formData.wheels,
        customerName: `${formData.firstName} ${formData.lastName}`,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
      };

      const res = await axios.post("http://localhost:3000/api/book", payload);

      if (res.status === 200 || res.status === 201) {
        message.success("Booking successful!");
        updateForm("dateRange", values.dateRange);
        setSubmittedData(payload);
        setDialogTitle("Booking Successful");
        setDialogMessage("Your vehicle has been booked successfully.");
      }
    } catch (err) {
      console.error(err);
      setDialogTitle("Booking Failed");
      setDialogMessage(err?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setOpen(true); // Show dialog no matter what
      setLoading(false);
    }
  };

  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const handleClose = () => {
    setOpen(false);
     if (dialogTitle === "Booking Successful") {
      goToFirstStep(); //  Only reset on success, optional logic
    }
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="dateRange"
          label="Booking Date Range"
          rules={[{ required: true, message: "Please select a date range" }]}
        >
          <RangePicker disabledDate={disabledDate} />
        </Form.Item>
        <AntButton type="primary" htmlType="submit" loading={loading}>
          Submit
        </AntButton>
      </Form>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
          {submittedData && dialogTitle === "Booking Successful" && (
            <Stack spacing={1} mt={2}>
              <Typography><strong>Customer Name:</strong> {submittedData.customerName}</Typography>
              <Typography><strong>User ID:</strong> {submittedData.userId}</Typography>
              <Typography><strong>Vehicle ID:</strong> {submittedData.vehicleId}</Typography>
              <Typography><strong>Vehicle Type ID:</strong> {submittedData.vehicleTypeId}</Typography>
              <Typography><strong>Wheels:</strong> {submittedData.wheels}</Typography>
              <Typography><strong>Start Date:</strong> {submittedData.startDate}</Typography>
              <Typography><strong>End Date:</strong> {submittedData.endDate}</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Step5;
