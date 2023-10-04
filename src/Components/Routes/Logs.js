import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api';


export default function Logs() {

const [tableData, setTableData] = useState([])

const columns = [
  { field: 'title', headerName: 'Task Name', width: 200 },
  { field: 'user', headerName: 'Assigned to', width: 200 },
  { field: 'status', headerName: 'Status', width: 200}
];

useEffect(() => {
  (async () => {
    const res = await api.get(`/task`);

    setTableData(res.data);

  })();
}, []);


  return (
      <DataGrid
      sx={{
        '.MuiDataGrid-columnHeaderTitle':{
          fontWeight : 'bold !important',
          fontSize : '20px',
          fontFamily : 'monospace'
        },
        margin : '5% auto',
        display : 'block',
        maxWidth : '600px',
        boxShadow: 2,
        backgroundColor : '#9AD1C9',
        border: 2,
        fontSize : '15px',
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main'
        },
      }}
        // style = {{margin : '5% auto', display : 'block', height: 'fit-content', maxWidth: '600px', backgroundColor : 'bisque'}}
        rows={tableData}
        getRowId={(row) => row._id }
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