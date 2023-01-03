import "./App.css";
import SignUp from "./components/SignUp";
import {StreamChat} from 'stream-chat'
import  Cookies  from "universal-cookie";
import Login from "./components/Login";


function App() {
	const api_key=import.meta.env.API_KEY
	const cookies=new Cookies()
	const token =cookies.get('token')
	const client=StreamChat.getInstance(api_key)

	if(token){
		client.connectUser({
			id: cookies.get('userId'),
			name: cookies.get('userName'),
			firstName: cookies.get('firstName'),
			lastName: cookies.get('lastName'),
			hashedPassword: cookies.get('hashedPassword')
		}, token).then(user=>{
			console.log(user)
		})
	}
	return (
		<div className="board">
			<SignUp/>
			<Login/>
		</div>
	);
}

export default App;
