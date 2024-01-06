import React, { useEffect, useState} from "react";
import timeline from "../Authentication/Photos/timeline.jpg";
import teamwork from "../Authentication/Photos/teamwork.jpg";
import meeting from "../Authentication/Photos/meeting.jpg";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userName, setUserName] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  
  async function userNameFunc(){
    try {
      const response = await api.get(`/user/${userId}`);
      if (response.status === 200) {
        setUserName(response.data.name)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function LoadHome() {
    if(token){
    try {
      const response = await api.get("/");
      if (response.status === 200) {
        console.log("User Authorized");
      }
    } catch (error) {
      console.log(error);
    }
  }else if (!token){
    navigate("/login")
  }
}

  useEffect(() => {
    LoadHome();
    userNameFunc();
  });

  return (
    <div>
        <h1 style={{ margin: "2%", fontWeight: "bold" }} align={"center"}> Welcome {userName} </h1>
      <div
        style={{ margin: "5% auto", display: "block" }}
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div
          style={{ height: "100%", width: "100%" }}
          className="carousel-inner"
        >
          <div className="carousel-item active">
            <img src={timeline} className="d-block w-100" alt="timeline" />
          </div>
          <div className="carousel-item">
            <img src={meeting} className="d-block w-100" alt="meeting" />
          </div>
          <div className="carousel-item">
            <img src={teamwork} className="d-block w-100" alt="team work" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
