import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./nav.js";
import Products from "./Products.js";
import produits from "./produits.json";
import ProductDetail from "./detailProduit.js";
import Panier from "./panier.js";
import Halwadlouz from "./halwa-dlouz.js";
import Sable from "./pages/SablePage.js";
import "react-toastify/dist/ReactToastify.css";
import Cakedesign from "./pages/Cakedesignpage.js";
import SignUp from "./pages/inscription.js";
//import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import Plateau from "./pages/plateaupage.js";
import Confirmation from "./pages/confirmationpage.js";

function App() {
  return (
    <BrowserRouter>
      {/* Barre de navigation commune */}
      <Nav />

      <Routes>
        {/* Route d'accueil */}
        <Route path="/" element={<Products produits={produits} />} />
        <Route path="halwa dlouz" element={<Halwadlouz />} />
        <Route path="plateau" element={<Plateau />} />
        <Route path="sablé" element={<Sable />} />
        <Route path="cake design" element={<Cakedesign />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="inscription" element={<SignUp />} />

        {/* Route pour afficher un produit détaillé */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Route pour afficher le panier */}
        <Route path="/panier" element={<Panier />} />
      </Routes>
      {/* <Toaster
        position="top-center"
        containerStyle={{ margin: "10px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style:{
            maxWidth: "500px",
            fontSize:"16px",
            padding:"16px 24px",
            backgroundColor:"#f8fafc",
            color:"#374151"
          }
        }}
      /> */}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
