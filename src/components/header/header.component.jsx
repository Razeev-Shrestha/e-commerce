import React from 'react';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.util';

import CartIcon from '../cart-icon/cart-icon.component';
import { createStructuredSelector } from 'reselect';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
} from './header.style';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import {selectCartHidden } from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';

const Header = ({currentUser,hidden}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                    CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='Div' onClick={()=>auth.signOut()}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />    
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
);

/* createStructured selector point the top level state properties that we need */
const mapStateToProps =createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
});

export default connect(mapStateToProps)(Header);