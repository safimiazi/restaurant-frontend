import { createSlice } from "@reduxjs/toolkit";


type TLoginRegistrationState = {
    status: "login" | "registration";
    isModalOpen: boolean;
};

const initialState: TLoginRegistrationState  = {
    status: "login",
    isModalOpen: false
}

const loginRegisrationSlice = createSlice({
    name: "loginRegistration",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.status = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
       
    },
})

export const { openModal, closeModal, changeStatus } = loginRegisrationSlice.actions;

export default loginRegisrationSlice.reducer;