import React, { useRef ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getexpenses,addexpenses,deleteexpenses,editexpenses} from '../store/expences';
//import axios from 'axios';
import {bin2} from 'react-icons-kit/icomoon/bin2';
import {pencil} from 'react-icons-kit/icomoon/pencil'
import { Icon } from 'react-icons-kit';
import exportFromJSON from 'export-from-json';
//import { csv } from 'export-from-json/exportTypes';

import Spinner from 'react-bootstrap/Spinner';
const ExpenseForm = () => {
  const dispatch = useDispatch();
  const expensecart = useSelector(state => state.expense.expensecart);
  useEffect(()=>{
    dispatch(getexpenses())},[dispatch]
  );
  //console.log(data);
  
  const total = useSelector(state => state.expense.total);
  const name = useSelector(state => state.auth.displayname);
  const loading=useSelector(state=>state.expense.isloading);
  const moneyref = useRef();
  const descriptionref = useRef();
  const categoryref = useRef();
  const downloadfunction = () =>{
    const dataArray = Object.values(expensecart).map((item) => ({
      key: item.key,
      money: item.money,
      description: item.description,
      category: item.category,
    }));
    const fileName = `expences of ${name}`;
    const exportType = 'csv';
    const data=new Array(dataArray);
    exportFromJSON({ data, fileName, exportType });
  } 

  const addExpensehandler = async() => {
    //const cartid = Math.random();
    const data={
      money: moneyref.current.value,
      description: descriptionref.current.value,
      category: categoryref.current.value,
    };
    await dispatch(addexpenses(data));
    dispatch(getexpenses());
    //dispatch(expenseActions.addfunction(data));
      
    moneyref.current.value = '';
    descriptionref.current.value = '';
    categoryref.current.value = '';
  };
  const edithandler = async(a,b,c,d) =>{
    const money=prompt('',b);
    const description=prompt('',c);
    const category=prompt('',d);
    const updateddata={key:a,money:money,description:description,category:category};
    await dispatch(editexpenses(updateddata));
    dispatch(getexpenses());
      };
    const deletehandler = async(index) => {
      await dispatch(deleteexpenses(index));
      dispatch(getexpenses());
      
  
    };
    
  

  return (
    <div>
      <div>
        {loading && <div><Spinner animation="border" variant="info" /></div>}
        <h2>Expense Form</h2>
        <Button variant='success' onClick={downloadfunction}>Download</Button>
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
