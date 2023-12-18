import * as React from "react";
import { Step, Stepper, StepButton, Typography } from "@mui/material";
import "./CheckOut.scss";
const steps = ["Chọn phòng", "Điền thông tin", "Đặt ngay"];

function CheckOutStep() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div id="check-out-step">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
export default CheckOutStep;