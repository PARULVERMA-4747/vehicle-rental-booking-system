import React from 'react';
import { FormProvider } from './context/FormProvider';
import MultiStepForm from './components/MultiStepForm';
import 'antd/dist/reset.css'; // optional for clean AntD base style
import './App.css'; // optional custom styles

const App = () => {
  return (
    <FormProvider>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <MultiStepForm />
      </div>
    </FormProvider>
  );
};

export default App;
