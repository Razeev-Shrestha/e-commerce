import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import {
    selectCartItems,
    selectCartTotal
} from '../../redux/cart/cart.selector';

import {CheckOutHeader,CheckOutPage,HeaderBlock,TestWarning,TotalContainer } from './checkout.style';


const checkoutPage = ({cartItems,totalPrice}) => (
    <CheckOutPage>
        <CheckOutHeader>
            <HeaderBlock>
                <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Description</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Remove</span>
            </HeaderBlock>
        </CheckOutHeader>
        {cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>  
            ))}
        <TotalContainer>TOTAL:${totalPrice}</TotalContainer>
        <TestWarning>
            *Please use the following test credit card for payments*
             <br />
            4242 4242 4242 4242 -Exp:01/22 -CVV: 123
        </TestWarning>
        <StripeCheckoutButton price={totalPrice}/> 
    </CheckOutPage>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice:selectCartTotal

});

export default connect(mapStateToProps)(checkoutPage);