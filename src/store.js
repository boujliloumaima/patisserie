import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import du slice du panier
import userReducer from "./userSlice"; // Import du slice de l'utilisateur

const store = configureStore({
  reducer: {
    cart: cartReducer, // Ajouter le reducer du panier
    user: userReducer, // Ajouter le reducer de l'utilisateur
  },
});

export default store;
