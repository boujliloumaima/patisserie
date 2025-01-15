import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./index.css";

export default function Nav() {
  // State to toggle the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Récupérer les informations de l'utilisateur depuis Redux
  const { isLoggedIn, name } = useSelector((state) => state.user);

  // Calculer le nombre total d'articles dans le panier
  const totalItems = cartItems.length;

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="global">
      <div className="header">
        <div className="user-container">
          {/* Afficher l'icône et le nom de l'utilisateur si connecté */}
          <Link to="inscription">
            <img src="user.png" alt="insription" className="icons" />
            <br></br>
          </Link>
          {isLoggedIn && <span>{name}</span>} {/* Affichage du nom */}
        </div>

        <img
          src="logob.png"
          alt="logo"
          style={{ width: "180px", height: "120px" }}
        />
        <div className="panier-container">
          <Link to="panier">
            <div className="cart-icon">
              <img src="panier.png" alt="panier" className="icons" />
              {totalItems > 0 && (
                <span className="cart-item-count">{totalItems}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="nav-container">
          {/* Hamburger Icon */}
          <div className="hamburger-icon" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {/* Nav Links - Show or hide based on menu state */}
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                Acceuil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="sablé"
                className="nav-link"
                onClick={toggleMenu}
                id={`${isMenuOpen ? "active" : ""}`}
              >
                Sablé
              </NavLink>
            </li>
            <li>
              <NavLink
                to="halwa dlouz"
                className="nav-link"
                onClick={toggleMenu}
              >
                halwa dlouz
              </NavLink>
            </li>
            <li>
              <NavLink to="plateau" className="nav-link" onClick={toggleMenu}>
                plateau
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cake design"
                className="nav-link"
                onClick={toggleMenu}
              >
                cake design
              </NavLink>
            </li>
          </ul>

          {/* Panier Link */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
