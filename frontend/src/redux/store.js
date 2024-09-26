import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import JobSlice from "./jobslice"
import AdminCompanySlice from "./adminCompanySlice"
const store = configureStore({
    reducer: {
        auth: authSlice,
        job: JobSlice,
        company:AdminCompanySlice
    }
})
export default store