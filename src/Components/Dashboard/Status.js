import React, {useState, useEffect} from "react";
import api from '../api';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import deployed from "./deployed.png";
import { ProgressBar } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../Context/AuthContext';

export default function Status(props) {
  const [taskStatus, setTaskStatus] = useState(props.status);
  const [taskCompletion, setTaskCompletion] = useState(props.completion);
  const [disable, setDisable] = useState(false);
  const { userRole } = useAuth();

 function resetStatus(){
    setTaskStatus("Assigned");
    setTaskCompletion(25);
    setDisable(false);
  }
  useEffect(() => {
    (async () => {
      const response = await api.put(
        `/task/edit/${props.id}`, {status : taskStatus, completion : taskCompletion});
        if (response.status === 201) {
          console.log("Item updated successfully");
        } else {
          console.error("Failed to update item");
        }      
    })()});

    const handleClick = ()=>{
      if(taskStatus === "Assigned"){
        setTaskStatus("In Progress");
        setTaskCompletion(50);
      }else if(taskStatus === "In Progress"){
        setTaskStatus("Under Review");
        setTaskCompletion(75);
        }else if(taskStatus === "Under Review"){
          setTaskStatus("Deployed");
          setTaskCompletion(100);
          setDisable(true);
    }
    }

  return (
    <>
    <Box
      sx={{
        background: "#fff",
        borderRadius: "7px",
        boxShadow: "0 2px 5px #ccc",
        padding: "10px",
        marginLeft: "4%",
        display : 'inline-block',
        justifyContent: "space-between",
        width : "60%"
      }}
    >
    <div style={{ display : 'flex', flexDirection : 'row', justifyContent : 'center' }}>
      <div style={{ width: '75%', margin : '2%' }}>
        <h6>Task Status : {taskStatus}</h6>
        <br/>
        <br/>
        <ProgressBar now = {taskCompletion} label = {`${taskCompletion}% completed`} animated />
        <br/>
        <br/>
        <Button disabled = {disable} style = {{margin: '2px', fontWeight : "bold"}} size="small" type = 'button' variant="contained" color="success" onClick={handleClick} >
          Update Status
        </Button>
        {userRole.role === "projectAdmin" && (<Button style = {{margin: '2px', float : "right", fontWeight : "bold"}} size="small" type = 'button' variant="contained" color="error" onClick={resetStatus} >
          Reset Status
        </Button>)}
      </div>
      <div style={{height : 'inherit', width: '0.05px', backgroundColor : 'grey', margin : '1%', padding : '1px' }}></div>
      <div style={{ width: '20%', textAlign : 'center', display : "block", margin : '2%',  }}>
        <h6 style={{alignItems : "center"}}>Deployed</h6>
        {taskCompletion === 100? (
          <img src={deployed}
          style={{textAlign: 'center',
          width: '150px',
            height: "150px"
          }}
          alt="Deployed"
        />
        ):null}
      </div>
    </div>

    </Box>
    </>
  );
}
