import { createSlice } from "@reduxjs/toolkit";
const UserAppliedSlice = createSlice(
    {
        name: "userappliedJobs",
        initialState: {
            allAppliedJobs: []
        },
        reducers: {
            setAppliedJobs: (state, action) => {
                state.allAppliedJobs = action.payload
            }
        }
    }
)
export const { setAppliedJobs } = UserAppliedSlice.actions;
export default UserAppliedSlice.reducer;