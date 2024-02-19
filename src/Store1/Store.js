import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
// import authSlice from "./authSlice";
// import authSlice from "./authSlice";
authSlice;
const Store = configureStore({
    reducer: {
        auth: authSlice,
        //TODO: add more slices here for posts
    },
});

export default Store;
