import { configureStore} from "@reduxjs/toolkit";
import authstore from "./authstore";
//import expencestore from "./expences";
import expenseSlice from "./expences";

const store=configureStore({
  reducer:{auth:authstore,expense:expenseSlice}
})

export default store;
