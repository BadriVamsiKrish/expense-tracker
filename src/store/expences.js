import { createSlice } from "@reduxjs/toolkit";
const intialExpense={expensecart:[]};
const expenseSlice = createSlice({
  name:'expense',
  initialState:intialExpense,
  reducers:{
    addfunction(state,action){
      state.expensecart=[...state.expensecart,action.payload];
    },
    editfunction: (state, action) => {
      console.log(action.payload);
      state.expensecart.splice(action.payload.updateddata.oldid, 1,action.payload.updateddata);

    },
    deletefunction: (state, action) => {
      const index = action.payload;
      state.expensecart.splice(index, 1);
    },
  }
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
