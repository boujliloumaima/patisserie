import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Charger les données depuis le cookie
const savedUser = Cookies.get("utilisateur");

const initialState = savedUser
  ? {
      ...JSON.parse(savedUser),
      isLoggedIn: true, // On ajoute manuellement isLoggedIn ici
    }
  : {
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
      const { name, email, phone, address } = action.payload;

      state.isLoggedIn = true;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;

      // Sauvegarde complète dans le cookie
      Cookies.set(
        "utilisateur",
        JSON.stringify({
          name,
          email,
          phone,
          address,
          isLoggedIn: true,
        }),
        { expires: 7 }
      );
    },
    deconnecterUtilisateur: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";

      // Supprimer le cookie
      Cookies.remove("utilisateur");
    },
  },
});

export const { enregistrerUtilisateur, deconnecterUtilisateur } =
  userSlice.actions;
export default userSlice.reducer;
