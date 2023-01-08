import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

const JoinGame = () => {
	const [rivalUserName, setRivalUserName] = useState("");
	const [channel, setChannel] = useState(null);
	console.log(channel);
     
	const { client } = useChatContext();
	const createChannel = async () => {
		// get the rivalUser first
		const response = await client.queryUsers({ name: { $eq: rivalUserName } });
		if (response.users.length === 0) {
			alert("User not found");
			return;
		}
		// if user exists then we have to create a channel
		const newChannel =  client.channel("messaging", {
			members: [client.userID, response.users[0].id],
		});
		await newChannel.watch();
		setChannel(newChannel);
	};
	return (
		<>
			{channel ? (
				<Channel channel={channel}>
                         <Game channel={channel}/>
                    </Channel>
			) : (
				<div className="joinGame">
					<h4 className="text-5xl text-red-500">Create Game</h4>
					<input type="text" name="" placeholder="Username of rival" id="" onChange={(e) => setRivalUserName(e.target.value)} />
					<button onClick={createChannel}>Start the game</button>
				</div>
			)}
		</>
	);
};

export default JoinGame;
