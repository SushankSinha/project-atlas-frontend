import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Logs() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "title", headerName: "Task Name", width: 200 },
    { field: "user", headerName: "Assigned to", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];

    /* eslint-disable react-hooks/exhaustive-deps */

  async function LogFunction() {
    try {
      const response = await api.get(`/task`);
      if (response.status === 200) {
        setTableData(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        await api.get(`/logout`);
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    LogFunction();
  }, []);

  return (
    <DataGrid
      sx={{
        ".MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold !important",
          fontSize: "20px",
          fontFamily: "monospace",
        },
        margin: "5% auto",
        display: "block",
        maxWidth: "600px",
        boxShadow: 2,
        backgroundColor: "#9AD1C9",
        border: 2,
        fontSize: "15px",
        borderColor: "primary.light",
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
      }}
      // style = {{margin : '5% auto', display : 'block', height: 'fit-content', maxWidth: '600px', backgroundColor : 'bisque'}}
      rows={tableData}
      getRowId={(row) => row._id}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}
