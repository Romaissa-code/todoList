import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ListItem.css";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux"; 
import {deleteItem, editItem,checkItem  } from "./features/items"; 



export const ListItems = () => {

  const { items } = useSelector((state) => state.items);

  const dispatch =useDispatch(); 
  const [editedItem,setEditedItem]=useState(""); 

  const onChickHandler = (id) => {
     dispatch(checkItem(id)); 
  };
  const onDeleteHandler = (id) => {
    dispatch(deleteItem(id))
   
  };
  const OnEditHandler = (id,item) => {
    dispatch(editItem({id,isEdit:true}));
    setEditedItem(item)
  };


  const keyDownHandler=(e,id)=>{
   if (e.keyCode === 13 && editedItem) {
     dispatch(editItem({ id, editedItem, isEdit: false }));
   }
  }; 
  const editHandler = (id) => {
    if (editedItem)
     dispatch(editItem({ id, editedItem, isEdit: false }));
  }; 


  return (
    <Box >
      { 
        items.map((listItem)=>{
          const {item,id,isCheck,isEdit}=listItem;
          return (
            <Box
              className="itemContainer"
              key={id}
              style={{
                boxShadow: isEdit
                  ? "1px 1px 5px #96B7AE"
                  : "1px 1px 5px #7C76DA",
              }}
            >
              <Box className="item">
                <Box
                  className="itemCheck"
                  onClick={() => onChickHandler(id)}
                  style={{
                    background: isCheck ? "#7C76DA" : "transparent",
                    display: isEdit ? "none" : "block",
                  }}
                />
                <Box sx={{ width: isEdit ? "100%" : "80%" }}>
                  {!isEdit ? (
                    <Typography
                      variant="body2"
                      style={{
                        textDecoration: isCheck ? "line-through" : "none",
                        color: isCheck ? "#7C76DA" : "black",
                      }}
                    >
                      <Box className="itemWrapper">{item}</Box>
                    </Typography>
                  ) : (
                    <TextField
                      value={editedItem}
                      variant="standard"
                      autoFocus
                      sx={{ width: "100%" }}
                      onChange={(e) => setEditedItem(e.target.value)}
                      onKeyDown={(e) => keyDownHandler(e, id)}
                      inputProps={{
                        sx: {
                          padding: "0",
                        },
                      }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              onClick={() => editHandler(id)}
                              className="update"
                            >
                              update
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Box>
                <Box
                  className="icons"
                  style={{ display: isEdit ? "none" : "flex" }}
                >
                  <Tooltip title="Delete Item" arrow placement="bottom-start">
                    <DeleteIcon
                      style={{ marginRight: "5px" }}
                      onClick={() => onDeleteHandler(id)}
                    />
                  </Tooltip>
                  <Tooltip title="Edit Item" arrow placement="bottom-start">
                    <EditIcon onClick={() => OnEditHandler(id, item)} />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          );
        })
      }

    </Box>
  );
};
