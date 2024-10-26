import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import EVCharts from "./components/EVCharts";
import SummaryCards from "./components/SummaryCards";
import "./style.css";
import EVTable from "./components/EVTable";
import EVDistributionByState from "./components/EVDistributionByCity";

const App = () => {
  const [evData, setEvData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the CSV
    fetch("/data-to-visualize/Electric_Vehicle_Population_Data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            console.log("Parsed CSV Data:", result.data);
            setEvData(result.data);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error in parsing CSV", error);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching the CSV file", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1 style={{ marginLeft: "9vw" }}>Electric Vehicle Dashboard</h1>

      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <SummaryCards data={evData} />
          <EVTable data={evData} />
          <EVCharts data={evData} />
          <EVDistributionByState data={evData} />
        </>
      )}
    </div>
  );
};

export default App;
