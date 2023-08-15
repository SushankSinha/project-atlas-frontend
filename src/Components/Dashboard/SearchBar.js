import { Container, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchBar({data}) {

  const [searchTask, setSearchTask] = useState('');

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTask(searchValue);
  };

  return (
    <Container style = {{ width : '50%', margin : "20px auto", display : 'block'}}>
      <TextField
        type="text"
        placeholder="Search Tasks"
        value={searchTask}
        onChange={handleSearch}
        style={{borderRadius : '10px', border: '2px solid black', width: '100%', marginTop : "10px" }}
      />
    </Container>
  );
}