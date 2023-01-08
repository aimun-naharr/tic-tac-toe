import React, { useState } from "react";
import Sqaure from "./Sqaure";
import {useChannelStateContext, useChatContext} from 'stream-chat-react'

const Board = () => {
	const rowStyles='flex w-full h-full'
	const {client}=useChatContext()
	const {channel}=useChannelStateContext()
	console.log(channel);
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
	const [player, setPlayer] = useState("X");
	const [turn, setTurn] = useState("X");
	const chooseSquare = async(square) => {
		if (turn === player && board[square] === "") {
			setTurn(player==='X'? 'O' : 'X')
			await channel.sendEvent({
				type: 'game-move',
				data: {square, player}
			})
			setBoard(board.map((val, i)=>{
				if(i===square && val===''){
					return player
				}
				return val
			}))
		}
	};
	channel.on((event)=>{
		if(event.type=== 'game-move' && event.user.id !== client.userID){
			const currentPlayer=event.data.player==='X'? 'O':'X'
			setPlayer(currentPlayer)
			setTurn(currentPlayer)
			setBoard(board.map((val, i)=>{
				if(i===event.data.square &&  val===''){
					return event.data.player //the opposite
				}else return val
			}))
		}
	})
	return (
		<div className="bg-cyan-600 flex flex-col w-[400px] h-[400px]  mx-auto ">
			<div className={rowStyles}>
				<Sqaure chooseSquare={() => chooseSquare(0)} val={board[0]} />
				<Sqaure chooseSquare={() => chooseSquare(1)} val={board[1]} />
				<Sqaure chooseSquare={() => chooseSquare(2)} val={board[2]} />
			</div>
			<div className={rowStyles}>
				<Sqaure chooseSquare={() => chooseSquare(3)} val={board[3]} />
				<Sqaure chooseSquare={() => chooseSquare(4)} val={board[4]} />
				<Sqaure chooseSquare={() => chooseSquare(5)} val={board[5]} />
			</div>
			<div className={rowStyles}>
				<Sqaure chooseSquare={() => chooseSquare(6)} val={board[6]} />
				<Sqaure chooseSquare={() => chooseSquare(7)} val={board[7]} />
				<Sqaure chooseSquare={() => chooseSquare(8)} val={board[8]} />
			</div>
		</div>
	);
};

export default Board;
