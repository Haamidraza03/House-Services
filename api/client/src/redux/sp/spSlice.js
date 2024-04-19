import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currentSp: null,
    loading:false,
    error:null,
};

const spSlice = createSlice({
    name:'sp',
    initialState,
    reducers:{
        logInStart:(state)=>{
            state.loading=true;
        },
        logInSuccess:(state,action)=>{
            state.currentSp = action.payload;
            state.loading = false;
            state.error = false;
        },
        logInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateSpStart: (state)=>{
            state.loading = true;
        },
        updateSpSuccess: (state,action)=>{
            state.currentSp = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateSpFailure: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteSpStart: (state)=>{
            state.loading = true;
        },
        deleteSpSuccess: (state)=>{
            state.currentSp = null;
            state.loading = false;
            state.error = false;
        },
        deleteSpFailure: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        splogOut:(state)=>{
            state.currentSp = null;
            state.loading =  false;
            state.error = false;
        },
    },
});

export const {logInStart,logInSuccess,logInFailure,updateSpFailure,updateSpStart,updateSpSuccess,deleteSpStart,deleteSpSuccess,deleteSpFailure,splogOut} = spSlice.actions;

export default spSlice.reducer;