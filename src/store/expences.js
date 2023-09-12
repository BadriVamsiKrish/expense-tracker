import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { useSelector } from "react-redux";

const initState = {
  expensecart:new Array([]),
  bgcolor: true,
  isloading: false,
  total:0,
};
//const expensecart=useSelector(state=>state.expense.expensecart);

export const getexpenses = createAsyncThunk(
  "expense/getexpenses",
  async () => {
    const response = await axios.get(
      "https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart/.json"
    );
    return response.data; // Assuming the data is an array
  }
);
export const addexpenses = createAsyncThunk(
  "expense/addexpenses",
  async (data) => {
    const response = await axios.post(
      "https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart/.json",data
    );
    return response.data; // Assuming the data is an array
  }
);
export const deleteexpenses = createAsyncThunk(
  "expense/deleteexpenses",
  async (data) => {
    const response = await axios.delete(
    `https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart/${data}.json`
    );
    return response.data; // Assuming the data is an array
  }
);
export const editexpenses = createAsyncThunk(
  "expense/editexpenses",
  async (data) => {
    const response = await axios.put(
    `https://react-http-f171e-default-rtdb.firebaseio.com/expence_cart/${data.key}.json`,data
    );
    return response.data; // Assuming the data is an array
  }
);


const expenseSlice = createSlice({
  name: "expense",
  initialState:initState,
  reducers: {
   
    setBgColor: (state) => {
      state.bgcolor = !state.bgcolor;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getexpenses.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getexpenses.fulfilled, (state, action) => {
        state.isloading = false;
        state.expensecart = action.payload;
        state.total=Object.keys(action.payload).reduce((sum,key)=>sum+parseFloat(action.payload[key].money),0);
      })
      .addCase(getexpenses.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(addexpenses.pending, (state) => {
        state.isloading = true;
      })
      .addCase(addexpenses.fulfilled, (state, action) => {
        state.isloading = false;
        state.expensecart =new Array(state.expensecart).push(action.payload);
        //addFunction(action.payload);
      })
      .addCase(addexpenses.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(deleteexpenses.pending, (state) => {
        state.isloading = true;
      })
      .addCase(deleteexpenses.fulfilled, (state, action) => {
        state.isloading = false;
        const indexToDelete = action.payload;
      state.expensecart = new Array(state.expensecart).filter(
      (_, index) => index !== indexToDelete
      );
        
      })
      
      .addCase(deleteexpenses.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(editexpenses.pending, (state) => {
        state.isloading = true;
      })
      .addCase(editexpenses.fulfilled, (state, action) => {
        state.isloading = false;
        const indexToDelete = action.payload;
      state.expensecart = new Array(state.expensecart).filter(
        (_, index) => index !== indexToDelete
      );
        
      })
      
      .addCase(editexpenses.rejected, (state) => {
        state.isloading = false;
      })
      ;
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
