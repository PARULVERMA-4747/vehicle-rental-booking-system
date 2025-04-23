import React, { useState } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import { Card } from 'antd';

const steps = [Step1, Step2, Step3, Step4, Step5];

const MultiStepForm = () => {
  const [current, setCurrent] = useState(0);
  const Step = steps[current];

  return (
    <Card style={{ maxWidth: 500, margin: '50px auto' }}>
      <Step 
        next={() => setCurrent(current + 1)} 
        goToFirstStep={() => setCurrent(0)} // 👈 Pass this prop to reset to Step1
      />
    </Card>
  );
};

export default MultiStepForm;
