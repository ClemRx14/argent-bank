import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username: 'DefaultUsername'
};

const userSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { updateUsername } = userSlice.actions;