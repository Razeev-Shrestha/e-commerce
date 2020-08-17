import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';

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
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
       
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]:value});
    }

    render() {
        const { googleSignInStart } = this.props;
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
                        <CustomButton
                            type='button'
                            onClick={googleSignInStart}
                            isGoogleSignIn
                        >
                            {''}
                            sign in with google
                            {''}
                        </CustomButton>
                    </div>
                    
                </form>
            </SignInContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null,mapDispatchToProps)(SignIn);