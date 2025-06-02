import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { enregistrerUtilisateur } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Inscription = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, address } = formData;

    if (name && email && phone && address) {
      dispatch(enregistrerUtilisateur({ name, email, phone, address }));
      toast.success("Inscription réussie !", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      navigate("/panier");
    } else {
      toast.error("Veuillez remplir tous les champs", {
        position: "top-right",
        autoClose: 5000,
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
              name="name"
              placeholder="Entrez votre nom"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Entrez votre téléphone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="Entrez votre adresse"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Valider l'inscription</button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
