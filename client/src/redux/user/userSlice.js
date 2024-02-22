import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    loading:false,
    error:null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logInStart:(state)=>{
            state.loading=true;
        },
        logInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        logInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateUserStart: (state)=>{
            state.loading = true;
        },
        updateUserSuccess: (state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {logInStart,logInSuccess,logInFailure,updateUserFailure,updateUserStart,updateUserSuccess} = userSlice.actions;

export default userSlice.reducer;