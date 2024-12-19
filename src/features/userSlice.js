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
    // Vérification de la maj du pseudo
    console.log(data);
    return {
        userName: data.body.userName,
        firstName: data.body.firstName,
        lastName: data.body.lastName,
    };
});



export const updateUser = createAsyncThunk("user/updateUser", async (newUsername, { Error }) => {
  
    const token = getCookie('userToken');
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        body: JSON.stringify({ userName: newUsername}),
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erreur durant le changement du pseudo')
    }

    const data = await response.json();
    return data.body.userName;
});

const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    error: undefined,
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
            state.username = action.payload.userName;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.error = null;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload || 'Erreur durant la récupération des datas User';
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.username = action.payload;
            state.error = null;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.error = action.payload || 'Erreur durant le changement du pseudo';
        });
    },
});

export default userSlice.reducer;
export const { updateUsername } = userSlice.actions;