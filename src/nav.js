import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";

export default function Nav() {
  // State to toggle the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = Cookies.get("utilisateur");
  const prof = user ? JSON.parse(user) : null;
  console.log(prof);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const avatarColor = useMemo(() => getRandomColor(), []);
  const getInitials = (user) => {
    if (!user) return "";
    const first = user.name ? user.name.charAt(0).toUpperCase() : "";
    const last = user.prenom ? user.prenom.charAt(0).toUpperCase() : "";
    return first + last;
  };

  // Calculer le nombre total d'articles dans le panier
  const totalItems = cartItems.length;

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="global">
      <div className="header">
        <div className="container-logo">
          <Link to="/profil">
            {prof && (prof.name || prof.prenom) ? (
              <div
                className="user-avatar-fixed"
                style={{ backgroundColor: avatarColor }}
              >
                {getInitials(prof)}
              </div>
            ) : (
              <img src="user.png" alt="user" className="user" />
            )}
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
