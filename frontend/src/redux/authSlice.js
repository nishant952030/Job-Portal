import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        profile:""
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        sethUser: (state, action) => {
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.user.profile.profile=action.payload
        }
    }
})

export const { setLoading,sethUser,setProfile } = authSlice.actions;
export default  authSlice.reducer;
