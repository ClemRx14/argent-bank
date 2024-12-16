import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Récupération de cookie

 export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

//Récupération de l'user depuis l'api

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {

    const token = getCookie('userToken');
    const response = await fetch ('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Erreur durant la récupération des datas User.')
    }
    const data = await response.json();
    return data.body.userName;
});

const initialState = {
    username: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.username = action.payload;
        });
    },
});

export default userSlice.reducer;
export const { updateUsername } = userSlice.actions;