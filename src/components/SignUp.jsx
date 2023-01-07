import React from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const SignUp = ({setIsAuth}) => {
	const [user, setUser] = useState(null);
     const cookies=new Cookies()
	const handleSignUp = () => {
		axios.post("http://localhost:8000/signup", user).then((res) => {
			if(res.data.token){
				const { firstName, lastName, userName, hashPassword, userId, token } = res.data;
               cookies.set('token', token)
               cookies.set('userName', userName)
               cookies.set('firstName', firstName)
               cookies.set('lastName', lastName)
               cookies.set('hashPassword', hashPassword)
               cookies.set('userId', userId)
			setIsAuth(true)
			}else{
				
			}
		});
	};
	return (
		<div>
			<h1>Sign up</h1>
			<input type="text" placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
			<input type="text" placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
			<input type="text" placeholder="UserName" onChange={(e) => setUser({ ...user, userName: e.target.value })} />
			<input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
			<button onClick={handleSignUp}>Sign Up</button>
		</div>
	);
};

export default SignUp;
