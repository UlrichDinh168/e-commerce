import React from "react";
import { useHistory } from "react-router-dom";
import Button from "shared/Button";
const Product = ({ imageUrl, description, price, name, productId }) => {
  const history = useHistory();

  const toProductDetail = () => {
    history.push(`/product/${productId}`);
  };
  return (
    <div>
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

        <Button onClick={toProductDetail} containerClassName="info__button" />
      </div>
    </div>
  );
};

export default Product;
