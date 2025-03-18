import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "./cartSlice";
import { Link, useNavigate } from "react-router-dom"; // Remplacez useHistory par useNavigate
import { toast } from "react-toastify";
//import toast from "react-hot-toast";

function Panier() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let cartItems = useSelector((state) => state.cart.cartItems);
  const { name, email, phone, address } = useSelector((state) => state.user); // Récupérer les infos utilisateur depuis Redux
  const navigate = useNavigate(); // Utilisez useNavigate au lieu de useHistory

  // Vérification si les informations de l'utilisateur sont complètes
  const isUserInfoComplete = name && email && phone && address;
  const dispatch = useDispatch();

  // Fonction de soumission de la commande
  const handleSubmit = async () => {
    if (isSubmitting) return; // Si la soumission est déjà en cours, ne rien faire

    // Vérifier si les informations de l'utilisateur sont complètes
    if (!isUserInfoComplete) {
      toast.info("Vous devez vous inscrire pour valider votre commande", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/inscription"); // Rediriger vers la page d'inscription
      return;
    }

    setIsSubmitting(true); // Indiquer que la commande est en cours d'envoi

    // Créer les données de la commande
    const data = {
      total: total,
      client: {
        nom: name,
        tele: phone,
        email: email,
        adress: address,
      },
      produits: cartItems.map((item) => ({
        nom: item.name,
        qty: item.quantity,
        prix: item.prix,
        image: item.image,
      })),
    };

    try {
      // Envoi de la commande via une requête POST
      const response = await fetch(
        "https://n8n.apps.kona.ma/webhook/delice-commande",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("donnés envoyer", data);

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Réponse du serveur:", jsonResponse);
        toast.success("Commande envoyée avec succès", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(clearCart()); // Vide le panier après l'envoi de la commande
        navigate("/confirmation");
      } else {
        const errorMessage = await response.text(); // Récupérer le message d'erreur détaillé
        toast.error(`Erreur lors de l'envoi de la commande.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la commande. Réessayer!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false); // Réinitialiser l'état de soumission
    }
  };

  // Calcul du total du panier
  const total = cartItems.reduce(
    (acc, item) => acc + item.prix * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity }));
    }
  };

  return (
    <div>
      <div className="cart-container">
        <h1 style={{ borderBottom: "1px solid #eee" }}>Votre Panier</h1>

        {/* Afficher les informations de l'utilisateur si l'utilisateur est connecté */}
        {isUserInfoComplete ? (
          <div className="welcome-message">
            <h2>
              Bienvenu, <span id="client-name">{name}</span> !
            </h2>
          </div>
        ) : (
          ""
        )}

        {/* Afficher le panier ou un message si vide */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3 style={{ textAlign: "center" }}>
              Votre panier est actuellement vide !
            </h3>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <button className="retournerbt">Aller à la boutique</button>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <div style={{ display: "flex", padding: "20px" }}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{item.name}</h2>
                    <p className="cart-item-price">{item.prix} MAD</p>

                    {/* Modifier la quantité */}

                    <div className="cart-item-quantity">
                      <button
                        className="quantity-decrease"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity -
                              (item.category === "plateau" ? 1 : 0.5)
                          )
                        }
                      >
                        -
                      </button>
                      <p
                        className="quantity-input"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {item.quantity}
                        {item.category === "plateau" ? "" : "kg"}
                      </p>
                      <button
                        className="quantity-increase"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity +
                              (item.category === "plateau" ? 1 : 0.5)
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "10px", marginTop: "10px" }}>
                <button
                  className="remove-item"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Supprimer
                </button>
                <img
                  className="icon-remove"
                  src="supp.png"
                  alt="Supprimer"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          ))
        )}

        {/* Afficher le total et bouton de validation */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <p style={{ textAlign: "center" }}>
              <strong>Total:</strong> {total} MAD
            </p>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="checkout-button"
            >
              {isSubmitting ? "Envoi en cours..." : "Valider la commande"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panier;
