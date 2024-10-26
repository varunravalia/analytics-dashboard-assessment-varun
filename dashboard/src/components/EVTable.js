import React, { useState } from "react";
import { Divider, Table } from "antd";

const EVTable = ({ data }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Columns of the tablee
  const columns = [
    {
      title: "Make",
      dataIndex: "Make",
      key: "Make",
      sorter: (a, b) => {
        const makeA = a.Make || "";
        const makeB = b.Make || "";
        return makeA.localeCompare(makeB);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Model",
      dataIndex: "Model",
      key: "Model",
      sorter: (a, b) => {
        const modelA = a.Model || "";
        const modelB = b.Model || "";
        return modelA.localeCompare(modelB);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "County",
      dataIndex: "County",
      key: "County",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
    },
    {
      title: "Electric Vehicle Type",
      dataIndex: "Electric Vehicle Type",
      key: "Electric Vehicle Type",
    },
    {
      title: "Electric Range (Miles)",
      dataIndex: "Electric Range",
      key: "Electric Range",
      sorter: (a, b) => a["Electric Range"] - b["Electric Range"],
    },
  ];

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
  };

  return (
    <div style={{ width: "80vw", margin: "0 auto" }}>
      <h2>Data Table</h2>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        rowKey={(record, index) => index}
        pagination={{
          current: pagination.current, // Current page
          pageSize: pagination.pageSize, // Page size
          showSizeChanger: true, // change page size
          pageSizeOptions: ["10", "20", "50"],
          total: data.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={handleTableChange}
      />
      <Divider style={{ borderColor: "grey" }} />
    </div>
  );
};

export default EVTable;
