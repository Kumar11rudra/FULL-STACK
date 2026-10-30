import { configureStore, createSlice } from '@reduxjs/toolkit'
const saved = (()=> {try{return JSON.parse(sessionStorage.getItem('exp33-auth'))}catch{return null}})()
const auth = createSlice({name:'auth',initialState:saved || {token:null,email:'',name:''},reducers:{
 login:(_state,action)=>{sessionStorage.setItem('exp33-auth',JSON.stringify(action.payload));return action.payload},
 logout:()=>{sessionStorage.removeItem('exp33-auth');return {token:null,email:'',name:''}}
}})
export const {login,logout}=auth.actions
export const store=configureStore({reducer:{auth:auth.reducer}})
