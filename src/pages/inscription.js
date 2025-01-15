import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { enregistrerUtilisateur } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom.trim() && email.trim() && phone.trim() && address.trim()) {
      dispatch(
        enregistrerUtilisateur({
          name: nom,
          email: email,
          phone: phone,
          address: address,
        })
      );
      navigate("/panier");
    } else {
      toast.error(`Veuillez remplir tous les champs`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="inscription-container">
      <h2>Inscrivez-vous !</h2>
      <div className="forminsc">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="nom"
              placeholder="Entrez votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              placeholder="Entrez votre téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="address"
              placeholder="Entrez votre adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
