import React, { useState } from 'react'
import { useEffect } from 'react';
const Getdata = () => {
  const [data ,setData]=useState([]);
  useEffect(()=>
{
  axios.get('https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart/.json')
  .then((data)=>{console.log(data);setData(data.data)})
  .catch((err)=>{console.log(err)})
},[]);
  return (
    <div>data</div>
  )
}

export default data;
//'https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart/.json'
https://jsonplaceholder.typicode.com/users
// .then((data)=>{data.data})
// .catch((err)=>{console.log(err)})
{/* {expensecart.map((item,index) => (
            <li key={item.id}>
              {item.money} - {item.description} - {item.category} 
              <Button variant='warning'onClick={()=>{edithandler(item,index)}}><Icon  icon={pencil}/></Button>
              <Button variant='danger' onClick={()=>{deletehandler(index)}}><Icon  icon={bin2}/></Button>
            </li>
          ))} */}
 // addFunction: (state, action) => {
    //   state.expensecart = [...state.expensecart, action.payload];
    // },
    // editFunction: (state, action) => {
    //   const updatedData = action.payload.updatedData;
    //   state.expensecart = state.expensecart.map((expense) =>
    //     expense.id === updatedData.id ? updatedData : expense
    //   );
    // },
    // deleteFunction: (state, action) => {
    //   const indexToDelete = action.payload;
    //   state.expensecart = state.expensecart.filter(
    //     (_, index) => index !== indexToDelete
    //   );
    // },