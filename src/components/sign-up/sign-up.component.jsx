import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.util';

import './sign-up.style.scss';

class SignUp extends React.Component{
    constructor() {
        super();

        this.state = {
            UserName: '',
            email: '',
            Password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { UserName, email, Password, confirmPassword } = this.state;
        if (Password !== confirmPassword) {
            alert("passwords don't match !!");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                Password,
            );
            await createUserProfileDocument(user, { UserName });
            this.setState({
                UserName: '',
                email: '',
                Password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    
    render() {
        const { UserName, email,confirmPassword,Password} = this.state;
        return (
            <div className="sign-up" >
                <h2 className='title'>I do not have a account</h2>
                <span>Sign Up With Your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='UserName'
                        value={UserName}
                        onChange={this.handleChange}
                        label='User Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='email'
                        required
                    />
                    <FormInput
                        type='Password'
                        name='Password'
                        value={Password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP </CustomButton>
                </form>
            </div>
        );
    }
}
 
export default SignUp;