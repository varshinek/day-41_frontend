import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const registerUser=createAsyncThunk(
    'user/registerUser',
    async(userCredentials)=>{
        const request= await axios.post(`http://localhost:3000/api/register`,userCredentials)
        const response = request.data;
        // localStorage.setItem('user',JSON.stringify(response.user));
        return response;
    }
)

export const loginUser=createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        const request= await axios.post(`http://localhost:3000/api/login`,userCredentials)
        const response = request.data;
        localStorage.setItem('user',JSON.stringify(response.user));
        return response;
    }
)

const userSlice =createSlice({
    name:'user',
    initialState:{
        loading: false,
        user:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user =null;
            state.error =null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user =action.payload ? action.payload.user : null;
            state.error =null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user =null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error='Access denied Invalid Credentials'; 
            }
            else{
                state.error =action.error.message;
            }
        })

        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.error.message;
        });
    }
})

export default userSlice.reducer;