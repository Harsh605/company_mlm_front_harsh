import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"

const Store = configureStore({
    reducer: {
        userCustom: userSlice,
    }
})

export default Store