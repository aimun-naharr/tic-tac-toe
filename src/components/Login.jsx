import React from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const Login = () => {
	const [user, setUser] = useState(null);
	const cookies=new Cookies()
	const handleLogin = () => {
		axios.post("http://localhost:8000/login", user).then((res) => {
			const { firstName, lastName, userName, hashPassword, userId, token } = res.data;
			cookies.set("token", token);
			cookies.set("userName", userName);
			cookies.set("firstName", firstName);
			cookies.set("lastName", lastName);
			cookies.set("hashPassword", hashPassword);
			cookies.set("userId", userId);
		});
	};
	return (
		<div>
			<h1>Login</h1>

			<input type="text" placeholder="UserName" onChange={(e) => setUser({ ...user, userName: e.target.value })} />
			<input type="password" placeholder="Name" onChange={(e) => setUser({ ...user, password: e.target.value })} />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
