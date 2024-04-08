import { errorToast } from "@/lib/helper"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const base_url = "http://localhost:5500/api/v1"


export const login = createAsyncThunk("login", async ({ email, password }, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/login`
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, { email, password }, config); // replace with your API endpoint and data
        console.log("response", response.data.data)
        return response.data;
    }
    catch (error) {
        errorToast("error.response.data.error");
        return rejectWithValue(error.response.data.error)
    }
})

export const register = createAsyncThunk("register", async ({ name, email, password, mobileNo, referralId, userType }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        }
    }
    let url = `http://localhost:5500/api/v1/register`
    try {
        const response = await axios.post(url, { name, email, referBy: referralId, password, mobileNo, userType }, config); // replace with your API endpoint and data
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log(error)

    }
})
export const verifyUserSendOtp = createAsyncThunk("verifyUserSendOtp", async ({ email }) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let url = `http://localhost:5500/api/v1/verify-user-send-otp`
    try {
        const response = await axios.post(url, { email }, config); // replace with your API endpoint and data
        console.log(response)
        alert(response.data.message)
        return response.data.data;
    } catch (error) {
        console.log(error)

    }
})
export const verifyEmail = createAsyncThunk("verifyEmail", async ({ token }) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let url = `http://localhost:5500/api/v1/verify-user-using-otp/:token`
    try {
        const response = await axios.put(url, config); // replace with your API endpoint and data
        console.log(response)
        return response.data.data;
    } catch (error) {
        throw error

    }
})

export const logout = createAsyncThunk("logout", async (_, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/logout`

    try {
        await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
        return rejectWithValue(error.response.data)
    }


})
export const loadUser = createAsyncThunk("loadUser", async () => {
    let url = `http://localhost:5500/api/v1/me`
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, {}, config); // replace with your API endpoint and data
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
})

export const updateProfile = createAsyncThunk("updateProfile", async ({ name, mobileNo, city, state, address, avatar, socialLinks }) => {
    console.log(socialLinks)
    let url = `http://localhost:5500/api/v1/me/Update`
    const config = { headers: { "Content-Type": "application/multipart/form-data" }, withCredentials: true };
    try {
        const response = await axios.put(url, { name, mobileNo, city, state, address, avatar, socialLinks }, config)
        return response.data
    } catch (error) {
        return error.response.data.error
    }
})
export const getMyAllReferrals = createAsyncThunk("myReferrals", async () => {
    let url = `http://localhost:5500/api/v1/users/my-referrals`
    const config = {
        headers: {
            "Content-Type": "application/json"
        }, withCredentials: true
    };
    try {
        const response = await axios.get(url, config)
        return response.data
    } catch (error) {
        return error.response.data.error
    }
})


export const allUsers = createAsyncThunk("allUsers", async ({ limit, page, search }) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let url;
    if (search) {
        url = `https://dummyjson.com/users/search?q=John`
    }
    else {
        url = `https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`
    }
    try {
        const response = await axios.get(url, config); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)

    }
})





export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        error: null,
        userData: null,
        isUpdated: false,
        isCreated: false,
        isDeleted: false,
        allUsers: [],
        isEmailSent: false,
        myReferrals: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isCreated = true
                state.isAuthenticated = true
                state.data = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isCreated = false
                state.data = null
                state.isAuthenticated = false
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true

            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null
            })
            .addCase(allUsers.pending, (state) => {
                state.isLoading = true

            })
            .addCase(allUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.userData = action.payload.user
            })
            .addCase(allUsers.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.userData = null
            })
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.error = action.error.message
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null

            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.userData = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false

            })

            .addCase(verifyUserSendOtp.pending, (state, action) => {
                state.isLoading = true
                state.isEmailSent = false
            })
            .addCase(verifyUserSendOtp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isEmailSent = true

            })
            .addCase(verifyUserSendOtp.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.isEmailSent = false

            })
            .addCase(getMyAllReferrals.pending, (state, action) => {
                state.isLoading = true
                state.myReferrals = []
            })
            .addCase(getMyAllReferrals.fulfilled, (state, action) => {
                state.isLoading = false
                state.myReferrals = action.payload.users

            })
            .addCase(getMyAllReferrals.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.myReferrals = []

            })
            .addCase(verifyEmail.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false

            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false

            })




    }
})


export default userSlice.reducer

