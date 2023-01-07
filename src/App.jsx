import "./App.css";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import Login from "./components/Login";
import { useState } from "react";
import {Chat} from 'stream-chat-react'
import Game from "./components/Game";
import JoinGame from "./components/JoinGame";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const api_key = "rt5xnetajdfx";
	const cookies = new Cookies();
	const token = cookies.get("token");
	const client = StreamChat.getInstance(api_key);

	if (token) {
		client.connectUser(
			{
				id: cookies.get("userId"),
				name: cookies.get("userName"),
				firstName: cookies.get("firstName"),
				lastName: cookies.get("lastName"),
				hashedPassword: cookies.get("hashedPassword"),
			},
			token
		).then((user) => {
			setIsAuth(true)
		});
	}
	return (
		<div className="board">
			{isAuth ? (
				<Chat client={client}>
					<JoinGame/>
				</Chat>
			) : (
				<>
					<SignUp setIsAuth={setIsAuth} />
					<Login setIsAuth={setIsAuth} />
				</>
			)}
		</div>
	);
}

export default App;
