import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./index.css";

export default function Nav() {
  // State to toggle the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

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
          <Link to="inscription">
            <img src="user.png" alt="insription" className="icons" />
            <br></br>
          </Link>
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
          <div>
            <img
              src="doubler.png"
              alt="err"
              className="hamburger-icon"
              onClick={toggleMenu}
            />
          </div>
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                Acceuil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="sablé"
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                onClick={toggleMenu}
              >
                Sablé
              </NavLink>
            </li>
            <li>
              <NavLink
                to="halwa dlouz"
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                onClick={toggleMenu}
              >
                halwa dlouz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="plateau"
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
                onClick={toggleMenu}
              >
                plateau
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cake design"
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active" : ""}`}
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
