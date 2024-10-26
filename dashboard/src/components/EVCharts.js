import React from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Divider } from "antd";
// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const EVCharts = ({ data }) => {
  const makeData = data.reduce((acc, item) => {
    if (item.Make) {
      acc[item.Make] = (acc[item.Make] || 0) + 1;
    }
    return acc;
  }, {});

  const pieLabels = Object.keys(makeData);
  const pieValues = Object.values(makeData);

  const pieColors = pieLabels.map((label) => {
    if (label === "TESLA") return "#FA6384";
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  });

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Make Distribution",
        data: pieValues,
        backgroundColor: pieColors,
      },
    ],
  };

  const rangeData = data.reduce((acc, item) => {
    if (item.Make && item["Electric Range"]) {
      if (!acc[item.Make]) {
        acc[item.Make] = { totalRange: 0, count: 0 };
      }
      acc[item.Make].totalRange += parseFloat(item["Electric Range"]);
      acc[item.Make].count += 1;
    }
    return acc;
  }, {});

  const barChartLabels = Object.keys(rangeData);
  const barChartValues = barChartLabels.map(
    (make) => rangeData[make].totalRange / rangeData[make].count
  );

  const barColors = barChartLabels.map(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const barChartData = {
    labels: barChartLabels,
    datasets: [
      {
        label: "Average Electric Range (miles)",
        data: barChartValues,
        backgroundColor: barColors,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Vehicle Maker",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Electric Range (miles)",
        },
        beginAtZero: true,
      },
    },
  };

  const yearData = data.reduce((acc, item) => {
    if (item["Model Year"]) {
      acc[item["Model Year"]] = (acc[item["Model Year"]] || 0) + 1;
    }
    return acc;
  }, {});

  const yearChartLabels = Object.keys(yearData);
  const yearChartValues = Object.values(yearData);

  const yearColors = yearChartLabels.map(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const yearChartData = {
    labels: yearChartLabels,
    datasets: [
      {
        label: "Vehicle Count by Model Year",
        data: yearChartValues,
        backgroundColor: yearColors,
      },
    ],
  };

  const yearChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Model Year",
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
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80vw",
          gap: "10rem",
        }}
      >
        <div style={{ width: "35vw" }}>
          <h2>Makers Distribution</h2>
          <div>
            <Pie data={pieChartData} style={{ maxHeight: "500px" }} />
          </div>
          <Divider style={{ borderColor: "grey" }} />
        </div>
        <div style={{ width: "35vw" }}>
          <h2 style={{ marginLeft: "1vw", textAlign: "left" }}>
            Vehicle Count by Model Year
          </h2>
          <div>
            <Bar
              data={yearChartData}
              options={yearChartOptions}
              style={{ height: "500px" }}
            />
          </div>
          <Divider style={{ borderColor: "grey" }} />
        </div>
      </div>

      <h2 style={{ width: "80vw", marginLeft: "3vw", textAlign: "left" }}>
        Average Electric Range by Make
      </h2>
      <div style={{ height: "400px", width: "80vw" }}>
        <Bar data={barChartData} options={barChartOptions} />
        <Divider style={{ borderColor: "grey" }} />
      </div>
    </div>
  );
};

export default EVCharts;
