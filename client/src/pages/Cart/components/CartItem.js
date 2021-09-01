import React from "react";
import Select from "shared/Select";
import Button from "shared/Button";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  const getQuantityOption = () => {
    if (item.countInStock === 0) return [];

    return [...Array(item.countInStock).keys()].map((value) => {
      return {
        label: value + 1,
        value: value + 1,
      };
    });
  };
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Button
        to={`/product/${item.product}`}
        containerClassName="cartItem__name"
      />
      <p>{item.name}</p>
      <p className="cartItem__price">${item.price}</p>
      <Select
        value={item.qty}
        options={getQuantityOption()}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      />
      {/* {[...Array(item.countInStock).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))} */}
      <Button
        containerClassName="cartItem__deleteBtn"
        onClick={() => removeHandler(item.product)}
        iconClassName="fas fa-trash"
      />
    </div>
  );
};

export default CartItem;
