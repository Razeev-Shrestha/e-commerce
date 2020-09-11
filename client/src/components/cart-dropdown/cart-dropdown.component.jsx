import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector }from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selector'
import { toggleCartHidden} from '../../redux/cart/cart.action';

import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems,history,dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
            ) : (
                <span className="empty-message">Your cart is Empty</span>
            )}
            
        </div>
        <CustomButton onClick={() =>
        {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>
            GO TO CHECKOUT
        </CustomButton> 
    </div>
);

const mapStateToProps =createStructuredSelector({
    cartItems:selectCartItems
});

/* connect method ma second argument pass garena bhane component ma aru properties
  haru pani pathuana milchha jasle garda extra code lekhnu pardaina */

/* withRouter() gives all the component/state/properties that are rendered within the cartdropdown component*/
export default withRouter(connect(mapStateToProps)(CartDropdown));