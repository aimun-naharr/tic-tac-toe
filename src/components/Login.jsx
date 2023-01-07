import React from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const Login = ({setIsAuth}) => {
	const [user, setUser] = useState(null);
	const [error, setError]=useState('')
	console.log(user);
	const cookies=new Cookies()
	const handleLogin = () => {
		axios.post("http://localhost:8000/login", user).then((res) => {
			
			if(res.data.token){
				const { firstName, lastName, userName,userId, token } = res.data;
			cookies.set("token", token);
			cookies.set("userName", userName);
			cookies.set("firstName", firstName);
			cookies.set("lastName", lastName);
			
			cookies.set("userId", userId);
			setIsAuth(true)
			}else{
setError('you are not authenticated')
			}
		});
	};
	return (
		<div>
			<h1>Login</h1>
			<input type="text" placeholder="UserName" onChange={(e) => setUser({ ...user, userName: e.target.value })} />
			<input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
			{
				error && <p>{error}</p>
			}
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
