import React, { useEffect, useState } from "react";
import api from "../api";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useAuth } from '../Context/AuthContext';

Chart.register(...registerables);

function ChartPage() {
  const [chartData, setChartData] = useState(null);
  const { logout } = useAuth();
  const token = localStorage.getItem('token');

  /* eslint-disable react-hooks/exhaustive-deps */

  async function ChartFunction() {
    if(token){
    try {
      const response = await api.get(`/task`);
        if (response.status === 200) {
          setChartData(response.data);
        }
    } catch (error) {
      console.log(error);
    }
  }else if(!token){
    logout();
  }
}

  useEffect(() => {
    ChartFunction();
  }, []);

  const Bardata = {
    labels: chartData?.map((x) => x.title),
    datasets: [
      {
        label: "Task Status",
        data: chartData?.map((x) => x.completion),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 0.1)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      ticks: {
        callback: function (value) {
          return value + '%';
        }
      }
      },
    },
  };

  return (
    <>
      <div
        style={{
          display: "block",
          width: "75%",
          height: "400px",
          margin: "30px auto",
        }}
      >
        <h2 style={{ display: "block", margin: "auto", textAlign: "center" }}>
          Task Completion Chart
        </h2>
        <Bar data={Bardata} options={barOptions} />
      </div>
    </>
  );
}

export default ChartPage;
