import React from "react";
import { Link } from "react-router-dom";

function Confirmation() {
  return (
    <div className="confirmation-container">
      <h1>Merci pour votre commande !</h1>
      <p>
        Votre commande a été envoyée avec succès et sera traitée dans les plus
        brefs délais.
      </p>
      <p>Vous recevrez un e-mail de confirmation bientôt.</p>
      {/* Vous pouvez ajouter un bouton pour retourner à la boutique */}
      <Link to="/">
        <button className="back-button">Retour à la boutique</button>
      </Link>
    </div>
  );
}

export default Confirmation;
