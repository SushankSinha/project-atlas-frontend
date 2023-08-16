import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import timeline from '../Authentication/Photos/timeline.jpg'
import teamwork from '../Authentication/Photos/teamwork.jpg'
import meeting from '../Authentication/Photos/meeting.jpg'


function Home() {

  const [user, setUser] = useState('')

  const navigate = useNavigate();

  const renderHomePage = async () => {
    try{
      const response = await axios.get(`https://atlas-tool-server.onrender.com`, {
        method : 'GET',
        headers : {
          Accept : 'application/json',
          'Content-Type' : 'application/json'
        },
        credentials : 'include'
      })

      navigate('/')

      const data = await response.status.json();
      console.log(data);
      setUser(data.name)

      if(!response.status === 200){
        const error = new Error(response.error);
        throw error;
      }

    }catch(err){
      console.log(err)
      
    }
  }

  useEffect(() => {
      renderHomePage();
  })

  return (
  <div >
    <h1 style = {{margin: '5% auto', display : 'block'}}>{user} Welcome back </h1>
    <div style = {{margin: '5% auto', display : 'block'}} id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div style = {{height : '50%', width: '50%'}} class="carousel-inner">
    <div  class="carousel-item active">
      <img  src={timeline} class="d-block w-100" alt="timeline" />
    </div>
    <div  class="carousel-item">
      <img  src={meeting} class="d-block w-100" alt="meeting" />
    </div>
    <div  class="carousel-item">
      <img  src={teamwork} class="d-block w-100" alt="team work" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  </div>
  );
}

export default Home;
