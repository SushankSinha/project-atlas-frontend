import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Logs({taskTitle, taskUser, taskStatus}) {

const columns = [
  { field: 'taskName', headerName: 'Task Name', width: 200, headerAlign : 'center' },
  { field: 'assignedTo', headerName: 'Assigned to', width: 200, headerAlign : 'center' },
  { field: 'status', headerName: 'Status', width: 200, headerAlign : 'center'}
];

const rows = [{id: taskTitle, taskName: taskTitle, assignedTo: taskUser, status: taskStatus}
];


  return (
      <DataGrid
        style = {{margin : '5% auto', display : 'block', height: 'fit-content', maxWidth: '50%', backgroundColor : 'bisque'}}
        rows={rows}
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