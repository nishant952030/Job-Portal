import { createSlice } from "@reduxjs/toolkit";
const LatestJobSlice = createSlice(
    {
        name: "latestjob",
        initialState: {
            allLatestJobs: [],
            descriptionLoader:false
        },
        reducers: {
            setAllLatestJobs: (state, action) => {
                state.allLatestJobs = action.payload
            },
            setDescriptionLoader: (state, action) => {
                state.descriptionLoader=action.payload
            }
        }
    }
)
export const { setAllLatestJobs,setDescriptionLoader } = LatestJobSlice.actions;
export default LatestJobSlice.reducer;