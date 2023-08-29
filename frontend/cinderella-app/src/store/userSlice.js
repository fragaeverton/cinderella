import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin} from '../api/login';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(formData)=>{
        return await userLogin(formData);
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading: false,
        user: null,
        error: null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state) =>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action) =>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action) =>{
            state.loading = false;
            state.user = null;
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;