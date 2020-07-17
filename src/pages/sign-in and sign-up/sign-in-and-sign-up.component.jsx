import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { SignInAndSignUpComponent } from './sign-in-and-sign-up.style';

const SignInAndSignUpPage = () => (
    <SignInAndSignUpComponent>
        <SignIn />
        <SignUp />
    </SignInAndSignUpComponent>
);

export default SignInAndSignUpPage;