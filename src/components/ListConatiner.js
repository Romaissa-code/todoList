import React , {useState} from 'react'
import { ListItems } from './ListItems';
import { ListStats } from './ListStats';
import { Avatar, Box, TextField, Button, InputAdornment ,IconButton} from "@mui/material";
import "./ListContainer.css"; 
import AddIcon from "@mui/icons-material/Add";
import { useDispatch} from 'react-redux';
import {addItem} from "./features/items"

export const ListConatiner = () => {
  const dispatch=useDispatch(); 

    const [item,setItem]=useState(""); 
    

    const clickHandler =()=>{
      const id=new Date().getTime().toString(); 
     if(item){
            dispatch(addItem({item,id})); 
            setItem("");
     }   
     
     }
    
    const onKeyDownHandler=(e)=>{     
     const id = new Date().getTime().toString(); 
     if(e.keyCode===13 && item){ 
         dispatch(addItem({item,id})); 
            setItem("");
     }
    } ; 

  return (
    <Box className="container">
      <Box className="inputContainer">
        <TextField
          variant="outlined"
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter an item"
          value={item}
          fullWidth
          onKeyDown={(e) => onKeyDownHandler(e)}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#7C76DA !important",
              },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={clickHandler}>
                  <AddIcon sx={{ color: "#7C76DA" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="listContainer">
        <Box className="list">
          <ListItems />
        </Box>
        <ListStats />
      </Box>
    </Box>
  );
}
