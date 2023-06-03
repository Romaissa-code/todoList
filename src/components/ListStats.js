import React from 'react'
import { useSelector } from 'react-redux';
import "./ListItem.css";
export  const ListStats = () => {
    const {items}=useSelector(state=>state.items); 
    const checkedItems=items.filter((item)=>{
      return item.isCheck===true
    }); 
    const itemsLeft=items.length-checkedItems.length; 
    
  return <div className='taskLeft'>{itemsLeft} Tasks left</div>;
}



