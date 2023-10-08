import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

export default function CheckoutItem({ cartItem }) {
  const { incrementCartItem, decrementCartItem, removeCartItem } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const incrementHandler = () => incrementCartItem(cartItem),
    decrementHandler = () => decrementCartItem(cartItem),
    removeHanlder = () => removeCartItem(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <div className='quantity'>
        <span className='arrow' onClick={decrementHandler}>
          &#10094;
        </span>
        <span className='value'>{quantity}</span>
        <span className='arrow' onClick={incrementHandler}>
          &#10095;
        </span>
      </div>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={removeHanlder}>
        &#10005;
      </div>
    </div>
  );
}
