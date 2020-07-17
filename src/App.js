import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homePage/homePage.component';
import shopPage from './pages/shop/shop.component';
import checkoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in and sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument} from './firebase/firebase.util';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// import { selectCollectionsForPreview} from './redux/shop/shop.selector';

class App extends React.Component {
 unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      setCurentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={shopPage} />
          <Route exact path='/checkout' component={checkoutPage}/>
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUpPage />
                )}
          />
        </Switch>
     </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray:selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
