import React, { useRef ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getexpenses,addexpenses,deleteexpenses,editexpenses} from '../store/expences';
//import axios from 'axios';
import {bin2} from 'react-icons-kit/icomoon/bin2';
import {pencil} from 'react-icons-kit/icomoon/pencil'
import { Icon } from 'react-icons-kit';
//import Spinner from 'react-bootstrap/Spinner';
//import { useState } from 'react';
const ExpenseForm = () => {
  //const [data,setData]=useState([]);
  useEffect(()=>{
    dispatch(getexpenses());
  });
  //console.log(data);
  const expensecart = useSelector(state => state.expense.expensecart);
  const total = useSelector(state => state.expense.total);
  const dispatch = useDispatch();
  const moneyref = useRef();
  const descriptionref = useRef();
  const categoryref = useRef();

  const addExpensehandler = () => {
    //const cartid = Math.random();
    dispatch(
      addexpenses({
        money: moneyref.current.value,
        description: descriptionref.current.value,
        category: categoryref.current.value,
      })
    );
    moneyref.current.value = '';
    descriptionref.current.value = '';
    categoryref.current.value = '';
  };
  const edithandler = (a,b,c,d) =>{
    const money=prompt('',b);
    const description=prompt('',c);
    const category=prompt('',d);
    const updateddata={key:a,money:money,description:description,category:category};
    dispatch(editexpenses(updateddata));
      };
    const deletehandler = (index) => {
      dispatch(deleteexpenses(index));
  
    };
    
  

  return (
    <div>
      <div>
        <h2>Expense Form</h2>
      <div> 
        {total>10000 && <Button variant='warning'>Get premium</Button>}
      </div> 
  
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" ref={moneyref} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" ref={descriptionref} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" ref={categoryref} />
      </div>
      <div>
        <Button variant="info" onClick={addExpensehandler}>
          Add Expense
        </Button>
      </div>
      <div>
        <h1>
          <center>Expenses added<Button variant='success'>Total:<Button variant='warning'>{total}</Button></Button></center>
        </h1>
        
        <ol>
            {expensecart!== null && Object.keys(expensecart).map((key) => (
              <li key={key} style={{fontSize:'20px',border:'5px outset black',backgroundColor:'ThreeDFace'}}>
              {expensecart[key].money}--{expensecart[key].description}--{expensecart[key].category}
              <Button variant='warning' onClick={(event)=>edithandler(key,expensecart[key].money,expensecart[key].description,expensecart[key].category)}><Icon  icon={pencil}/></Button>
              <Button variant='danger' onClick={(event)=>deletehandler(key)}><Icon  icon={bin2}/></Button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ExpenseForm;
