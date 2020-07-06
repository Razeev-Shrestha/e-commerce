import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey='pk_test_51H1sNrI2Rmn7HEPwoij5mp1bcUD0uSmlOeK01I1pYApwbcrjoPV3ALNPWh5WJEWkdZw1LsQsHaL0pxNm2mep4UYU001AbdQrjU'	
   
    
    const onToken = token => {
        console.log(token);
             Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Payment is Successed',
            showConfirmButton: false,
            timer: 1500
          })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='TEST Clothing.Ltd'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;