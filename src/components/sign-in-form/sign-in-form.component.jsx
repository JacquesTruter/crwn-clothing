import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defualtFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defualtFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const resetFormFields = () => {
		setFormFields(defualtFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSumbit = async (event) => {
		event.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);

			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect password for email');
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email');
					break;
				default:
					console.log(error);
			}
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Already have a account?</h2>
			<span>Sign in with your Email and Password </span>
			<form onSubmit={handleSumbit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" onClick={signInWithGoogle} buttonType="google">
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
