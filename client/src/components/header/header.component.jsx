import React from 'react';
import { connect } from 'react-redux';

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
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden,signOutStart }) => (
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
                <OptionLink as='Div' onClick={signOutStart}>SIGN OUT</OptionLink>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);