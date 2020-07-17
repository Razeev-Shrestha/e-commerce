import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth,signInWithGoogle } from '../../firebase/firebase.util';

import { SignInContainer,TitleContainer} from './sign-in.style';

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(error);
        }
       
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]:value});
    }

    render() {
        return (
            <SignInContainer>
                <TitleContainer>I Already Have an Account</TitleContainer>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type="submit">sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {''}
                            sign in with google{''}
                        </CustomButton>
                    </div>
                    
                </form>
            </SignInContainer>
        );
    }
}

export default SignIn;