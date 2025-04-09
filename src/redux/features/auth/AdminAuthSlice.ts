import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAdmin = {
  userId: string;
  phone: string;
  role: string;
  email?: string;
  name?: string;
  address?: string;
};

type TAdminAuthState = {
  user: null | TAdmin;
  token: null | string;
};

const initialState: TAdminAuthState = {
  user: null,
  token: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<{user: TAdmin, token: string}>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    adminLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAdmin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;

export const useCurrentAdminToken = (state: { adminAuth: TAdminAuthState }) => state.adminAuth.token;
export const selectCurrentAdmin = (state: { adminAuth: TAdminAuthState }) => state.adminAuth.user;