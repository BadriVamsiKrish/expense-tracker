import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

const Expenceform = () => {
  const money=useRef();
  const[moneyval,setMoneyval]=useState('');
  const description=useRef();
  const[descriptionval,setDescriptionval]=useState('');
  const category=useRef();
  const[categoryval,setCategoryval]=useState('');
  const[datalist,setDatalist]=useState([]);
  const addhandler = () =>{
    datalist.push({'money':parseInt(money.current.value),'description':description.current.value,'category':category.current.value});
    setMoneyval('');
    setDescriptionval('');
    setCategoryval('');
    setDatalist([...datalist]);
    console.log(datalist);
  } 
  return (
    <div>
      <form style={{border:'5px outset black',padding:'20px',fontSize:'20px'}}>
        Money spent:<input placeholder='enter money' value={moneyval} type='number'onChange={(event)=>setMoneyval(event.target.value)} ref={money}/><br/>
        Description:<input value={descriptionval} type='text'onChange={(event)=>setDescriptionval(event.target.value)}ref={description}/><br/>
        Category:<input value={categoryval} type='text'onChange={(event)=>setCategoryval(event.target.value)} ref={category}/><br/>
        <Button style={{alignSelf:'flex-end'}} onClick={(event)=>addhandler()}>Add</Button>
        <h2>Items</h2>
        <ol>{datalist.map((item)=>{return (<li key={Math.random()}>Money:{item.money}-description:{item.description}-category:{item.category}</li>)})}</ol>

      </form>
    </div>
  )
}

export default Expenceform;