import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Container style = {{width : '50%', margin : "10px auto", display : 'block'}}>
      <TextField
        id="search"
        type="text"
        label="Search"
        value={searchText}
        onChange={handleChange}
        style={{ width: '100%', marginTop : "10px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}