"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Stepper, Step, StepButton, StepLabel } from '@mui/material';
import { Card } from "@mui/material";

import BusinessInfoForm from "@/Components/Individual/BusinessInfoForm.jsx";
import ContactPersonForm from "@/Components/Individual/ContactPersonForm.jsx";

const steps = ["Business Info", "Contact Person Info"];

function CustomStepIcon(props) {
  const { active, completed, icon } = props;
  return (
    <div
      style={{
        backgroundColor: active ? "#68812A" : completed ? "green" : "#ccc",
        color: "white",
        borderRadius: "50%",
        width: 25,
        height: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
  );
}

const Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({});
  };

  return (
    <div className="flex flex-col items-center mt-16 min-h-[78vh]">
      <Card
        sx={{
          width: 900,
          padding: 4,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Let's Get Started With
          </h2>
          <h3 className="text-lg font-bold text-gray-600 text-center">
            Individual
          </h3>
          <p className="text-center text-gray-500 mb-6">
            Please provide the following information
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton onClick={handleStep(index)}>
                  <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <BusinessInfoForm
              onNext={handleComplete}
              onBack={handleBack}
              formData={formData} // Pass formData to BusinessInfoForm
            />
          )}
          {activeStep === 1 && (
            <ContactPersonForm
              onNext={handleComplete}
              onBack={handleBack}
              formData={formData} // Pass formData to ContactPersonForm
            />
          )}
        </Box>

        <p className="text-center text-green-600 mt-4">
          Already have an account?{" "}
          <a href="#" className="underline">
            Sign In
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Page;