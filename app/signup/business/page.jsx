"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Stepper, Step, StepButton, StepLabel, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import BusinessInfoForm from "@/Components/Business/BusinessInfoForm";
import ContactPersonForm from "@/Components/Business/ContactPersonForm";

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
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
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

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleSubmitData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-auto sm:min-h-[85vh] p-4">
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "600px", md: "800px", lg: "900px" },
          padding: { xs: 2, sm: 3, md: 4 },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Let's Get Started With
          </h2>
          <h3 className="text-lg font-bold text-gray-800 text-center">
            Business
          </h3>
          <p className="text-center text-gray-500 mb-4">
            Please provide the following information
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton onClick={handleStep(index)}>
                  <StepLabel StepIconComponent={CustomStepIcon}>
                    {label}
                  </StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <BusinessInfoForm
              onNext={handleComplete}
              onBack={handleBack}
              formData={formData}
            />
          )}
          {activeStep === 1 && (
            <ContactPersonForm
              onNext={handleSubmitData}
              onBack={handleBack}
              loading={loading}
              formData={formData}
            />
          )}
        </Box>

        <p className="text-center mt-4">
          <span className="text-black">Already have an account? </span>
          <a href="/" className="text-green-600 font-medium">
            Sign In
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Page;
