import { createSlice } from "@reduxjs/toolkit";
const AdminCompanySlice = createSlice(
    {
        name: "company",
        initialState: {
            allCompanies: [],
            loader: false
        },
        reducers: {
            setAllCompanies: (state, action) => {
                state.allCompanies = action.payload
            },
            setLoader: (state, action) => {
                state.loader = action.payload;
            }
        }
    }
)
export const { setAllCompanies,setLoader } = AdminCompanySlice.actions;
export default AdminCompanySlice.reducer;