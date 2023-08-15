import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

ChartJS.register(ArcElement, Tooltip, Legend);

const Bardata = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Background color of bars
        borderColor: 'rgba(54, 162, 235, 1)', // Border color of bars
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {

    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };




export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    }
  ]
};

function ChartPage() {
  return (
    <>
    <div
      style={{
        height: "300px",
        width: "300px",
        border: "5px solid bisque",
        padding: "20px"
      }}
    >

      <Doughnut data={data} />

    </div>

      
    <div>
      <h2>Bar Chart Example</h2>
      <Bar data={Bardata} options={barOptions} />
    </div>

    </>
  );
}

export default ChartPage;
