import React from "react";

const SummaryCards = ({ data }) => {
  const totalEVs = data.length;

  const cafvEligible = data.filter(
    (item) =>
      item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] &&
      item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]
        .toLowerCase()
        .includes("eligible")
  ).length;

  const avgRange =
    data.reduce(
      (acc, item) => acc + (parseInt(item["Electric Range"]) || 0),
      0
    ) / totalEVs;

  const makeCounts = data.reduce((acc, item) => {
    acc[item.Make] = (acc[item.Make] || 0) + 1;
    return acc;
  }, {});

  const topMake = Object.keys(makeCounts).length
    ? Object.keys(makeCounts).reduce((a, b) =>
        makeCounts[a] > makeCounts[b] ? a : b
      )
    : "N/A";

  return (
    <div className="summary-cards">
      <div className="card">
        Total EVs:
        <p>{totalEVs}</p>
      </div>
      <div className="card">
        CAFV Eligible Vehicles:
        <p>{cafvEligible}</p>
      </div>
      <div className="card">
        Average Electric Range:
        <p>{Math.round(avgRange)} miles</p>
      </div>
      <div className="card">
        Top Make:
        <p>{topMake}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
