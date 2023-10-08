import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import routes from '../../utils/routes';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const toCheckout = () => {
    navigate(`/${routes.CHECKOUT}`);
  };

  return (
    <div className='cart-dropdown-container'>
      {cartItems ? (
        <div className='cart-items'>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </div>
      ) : (
        <div className='empty-message'></div>
      )}
      <Button onClick={toCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
