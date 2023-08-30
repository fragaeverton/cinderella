import { createSlice } from "@reduxjs/toolkit";
//import { cookies } from '../index';

const cartSlice = createSlice({
    name: 'cart',
    initialState: 0,//cookies.get("SESSION").cart.length,
    reducers:{
        increment: (state) => state + 1,
        setValue: (state, action) => action.payload,
    }
})

export const {increment, setValue } = cartSlice.actions
export default cartSlice.reducer;       