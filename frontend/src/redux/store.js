import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import JobSlice from "./jobslice";
import AdminCompanySlice from "./adminCompanySlice";
import LatestJobSlice from "./latestJobSlice.js";
import UserAppliedSlice from "./userAppliedJobs";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Configuration object for redux-persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage, // Use default localStorage
};

// Combine all the slices into a root reducer
const rootReducer = combineReducers({
    auth: authSlice,
    job: JobSlice,
    latestjob: LatestJobSlice,
    company: AdminCompanySlice,
    userappliedJobs: UserAppliedSlice
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and necessary middleware
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create persistor to be used with PersistGate
export const persistor = persistStore(store);

export default store;
