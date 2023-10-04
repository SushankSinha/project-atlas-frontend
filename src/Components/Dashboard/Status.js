import React, {useState} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from '../api'

export default function Status(props) {
  const steps = [ `"${props.title}" is assigned`, `"${props.title}" is in progress`, `"${props.title}" is under review`, `"${props.title}" is completed!`];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [taskStatus, setTaskStatus] = useState("Assigned");
  const [taskCompletion, setTaskCompletion] = useState();

  const handleStatusUpdate = async () => {
    try {
      const response = await api.put(
        `/task/edit/${props.id}`, {status : taskStatus, completion : taskCompletion});
        
        if(Object.keys(completed).length === 0){
          setTaskStatus('Assigned')
          }else if(Object.keys(completed).length===1){
            setTaskStatus('In Progress')
            }else if(Object.keys(completed).length=== 2){
              setTaskStatus('Under Review')
              }else {
                setTaskStatus('Review Completed')
                }
    
      if (response.status === 201) {
        console.log("Task updated successfully");
      } else {
        console.error("Failed to update Task");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const taskStage = async () => {
    try {
      const response = await api.get(
        `//task/${props.id}`);

        console.log(response.data)
        if(response.data.status==='Assigned'){
        setTaskCompletion(25)
        }else if(response.data.status==='In Progress'){
          setTaskCompletion(50)
          }else if(response.data.status==='Under Review'){
            setTaskCompletion(75)
            }else if(response.data.status==='Review Completed'){
              setTaskCompletion(100)
              }

      if (response.status === 200) {
        console.log("Task fetched successfully");
      } else {
        console.error("Failed to fetch Task");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  // eslint-disable-next-line

  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "7px",
        boxShadow: "0 2px 5px #ccc",
        padding: "10px",
        width: "60%",
        marginLeft: "4%",
        display : 'inline-block'
      }}
    >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Task "{props.title}" is Completed!</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={()=>{handleReset();taskStage();setTaskStatus('Assigned')}}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{mr: 2, mt: 2, mb: 1, py: 1 }}>
              Stage {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Previous Stage
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Stage {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={()=>{handleComplete(); handleStatusUpdate(); taskStage()}}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Stage"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
