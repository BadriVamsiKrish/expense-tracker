import { createSlice } from "@reduxjs/toolkit";
const intialauth={isAuthenticated:false,emailverified:false,islogin:true,authId:'',showupdateform:false,displayname:'',photourl:''};
const authSlice =createSlice({
  name:'auth',
  initialState:intialauth,
  reducers:{
    login(state){
      state.isAuthenticated=true;
    },
    logout(state){
      state.isAuthenticated=false;
    },
    emailverify(state){
      state.emailverified=true;
    },
    isloginverify(state){
      state.islogin=!state.islogin;
    },
    setAuthid(state,action){
      state.authId=action.payload;
    },
    setshowupdateform(state){
      state.showupdateform=!state.showupdateform;
    },
    setdisplayname(state,action){
      state.displayname=action.payload;
    },
    setphotourl(state,action){
      state.photourl=action.payload;
    }
  }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;