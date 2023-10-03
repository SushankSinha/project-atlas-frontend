import React from "react";
import timeline from '../Authentication/Photos/timeline.jpg'
import teamwork from '../Authentication/Photos/teamwork.jpg'
import meeting from '../Authentication/Photos/meeting.jpg'
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {

  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
/* eslint-disable react-hooks/exhaustive-deps */
  
async function LoadHome(){
      try{
        const response = await axios.get('https://atlas-tool-server.onrender.com', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
    );
    if(response.status === 200){
    setData(response.data)
    }
    
      }catch(error){
        console.error('Error:', error);
        if(error){
        navigate('/login')
      }
    }
    };
  
    useEffect(() => {
      LoadHome()
  }, []);

  function HomePage (){
    return (
      <div >
      <Typography style = {{margin: '2%', fontWeight : 'bold'}} >
        <h1 align = { 'center'}> Welcome back </h1>
      </Typography>
        <div style = {{margin: '5% auto', display : 'block'}} id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
      <div style = {{height : '100%', width: '100%'}} className="carousel-inner">
        <div  className="carousel-item active">
          <img  src={timeline} className="d-block w-100" alt="timeline" />
        </div>
        <div  className="carousel-item">
          <img  src={meeting} className="d-block w-100" alt="meeting" />
        </div>
        <div  className="carousel-item">
          <img  src={teamwork} className="d-block w-100" alt="team work" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
      </div>
    )
  }

  return (
    <div>
    {data && (<HomePage/>)}
    </div>
  )
}

export default Home;
