import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  name: "",
  email: "",
  phone: "",
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    enregistrerUtilisateur: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
    deconnecterUtilisateur: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
    },
  },
});

export const { enregistrerUtilisateur, deconnecterUtilisateur } =
  userSlice.actions;

export default userSlice.reducer;
