import { createSlice } from "@reduxjs/toolkit";
const JobSlice = createSlice(
    {
        name: "job",
        initialState: {
            allJobs: []
        },
        reducers: {
            setAllJobs: (state, action) => {
                state.allJobs=action.payload
              }
          }
    }
)
export const { setAllJobs } = JobSlice.actions;
export default JobSlice.reducer;