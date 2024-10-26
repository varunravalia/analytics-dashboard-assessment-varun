import React from "react";
import { Bar } from "react-chartjs-2";
import { Divider } from "antd";

const EVDistributionByCity = ({ data }) => {
  const cityCounts = data.reduce((acc, item) => {
    if (item.City) {
      acc[item.City] = (acc[item.City] || 0) + 1;
    }
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "EVs by City",
        data: Object.values(cityCounts),
        backgroundColor: "#1573e6",
      },
    ],
  };
  const barOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Cities",
        },
      },
      y: {
        title: {
          display: true,
          text: "Vehicle Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="charts"
      style={{
        display: "flex",
      }}
    >
      <h2 style={{ width: "80vw", marginLeft: "3vw", textAlign: "left" }}>
        Vehicle count by City
      </h2>
      <div style={{ width: "80vw" }}>
        <Bar data={barData} options={barOptions} />
        <Divider style={{ borderColor: "grey" }} />
      </div>
    </div>
  );
};

export default EVDistributionByCity;
