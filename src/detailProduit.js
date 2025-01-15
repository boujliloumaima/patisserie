import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ajouter } from "./cartSlice";
import { useParams } from "react-router-dom";
import "./index.css";
import produits from "./produits.json";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = produits.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const ajoutercard = () => {
    dispatch(ajouter({ ...product, quantity }));
    navigate("/");
  };

  return (
    <div class="product-detail">
      <div class="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div class="product-info">
        <h1>{product.name}</h1>

        <p class="product-title">{product.description}</p>

        <p class="product-price">{product.prix} MAD</p>

        <input
          type="number"
          id="quantity"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ width: "60%" }}
        />

        <button onClick={ajoutercard} className="add-to-cart">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
