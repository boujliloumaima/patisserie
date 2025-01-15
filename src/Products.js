import React from "react";

import produits from "./produits.json";
import "./index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Products() {
  return (
    <div className="products-page">
      <div className="product-list">
        <div className="product-grid">
          {produits.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  color: " rgb(165, 161, 161)",
                }}
              >
                <h2>{product.name}</h2>

                <h2>{product.prix} DH</h2>
              </div>
              <Link to={`/product/${product.id}`}>
                <button>voir plus</button>
              </Link>
              <Outlet />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
