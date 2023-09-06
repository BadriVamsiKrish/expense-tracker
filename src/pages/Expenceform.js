import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const Expenceform = () => {
  const[datalist,setDatalist]=useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  const fetchData = () => {
    axios.get('https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart.json')
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);
        //setDatalist(fetchedData);// Update the component state with the data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const money=useRef();
  const[moneyval,setMoneyval]=useState('');
  const description=useRef();
  const[descriptionval,setDescriptionval]=useState('');
  const category=useRef();
  const[categoryval,setCategoryval]=useState('');
  
  const addhandler = () =>{
    
    datalist.push({'money':parseInt(money.current.value),'description':description.current.value,'category':category.current.value});
    // Make a POST request using fetch
    axios.post('https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart.json',{'money':parseInt(money.current.value),'description':description.current.value,'category':category.current.value}).then(()=>alert('data is submited')).catch((er)=>alert(er));

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
        <ol>{Object.keys(data).map((key) => (
          <li key={key}>
          <p>Category: {data[key].category}</p>
          <p>Description: {data[key].description}</p>
          <p>Money: {data[key].money}</p>
        </li>
      ))}</ol>
      </form>
    </div>
  )
}

export default Expenceform;