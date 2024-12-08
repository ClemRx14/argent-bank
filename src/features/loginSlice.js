import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
    error: undefined,
    userLog: false,
    redirectionUser: false,
};

 export const loginUser = createAsyncThunk('user/login', async (informationsUser, thunkAPI) => {
    console.log('Tentative de connexion avec:', informationsUser);
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(informationsUser),
        });

        if (!response.ok) {
            throw new Error('Erreur durant la connexion');
        }

        const data = await response.json();
        console.log('Données retournées:', data);
        if (data.body && data.body.token){
            localStorage.setItem('userToken', data.body.token);
        }
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
 });


 const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Action pour logout l'user
        logout: (state) => {
            localStorage.removeItem("userToken");
            state.user = null;
            state.userLog = false;
            state.error = null;
            state.redirectionUser = false;
        },
    },
    extraReducers: (builder) => {
        builder
    // Si appel api fullfilled
    .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Connexion réussie, données utilisateur:', action.payload);
        state.user = action.payload;
        state.userLog = true;
        state.error = null;
        state.redirectionUser = true;
    })
    // Cas si l'appel échoue 
    .addCase(loginUser.rejected, (state, action) => {
        console.log('Erreur de connexion:', action.payload);
        state.error = action.payload;
        state.userLog = false;
    });
    },
 });


export default loginSlice.reducer;
export const { logout } = loginSlice.actions;