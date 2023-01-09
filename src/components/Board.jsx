import React, { useEffect, useState } from "react";
import Sqaure from "./Sqaure";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from "./winningPattern";

const Board = ({ result, setResult }) => {
	const rowStyles = "flex w-full h-full gap-2";
	const { client } = useChatContext();
	const { channel } = useChannelStateContext();
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
	const [player, setPlayer] = useState("X");
	const [turn, setTurn] = useState("X");

	const chooseSquare = async (square) => {
		if (turn === player && board[square] === "") {
			setTurn(player === "X" ? "O" : "X");
			await channel.sendEvent({
				type: "game-move",
				data: { square, player },
			});
			setBoard(
				board.map((val, i) => {
					if (i === square && val === "") {
						return player;
					}
					return val;
				})
			);
		}
	};
	channel.on((event) => {
		if (event.type === "game-move" && event.user.id !== client.userID) {
			const currentPlayer = event.data.player === "X" ? "O" : "X";
			setPlayer(currentPlayer);
			setTurn(currentPlayer);
			setBoard(
				board.map((val, i) => {
					if (i === event.data.square && val === "") {
						return event.data.player; //opposite player
					} else return val;
				})
			);
		}
	});

	const checkWinner = () => {
		Patterns.forEach((currentPattern) => {
			const firstPlayer = board[currentPattern[0]];
			if (firstPlayer == "") return;
			let foundWinningPattern = true;
			currentPattern.forEach((index) => {
				if (board[index] !== firstPlayer) {
					foundWinningPattern = false;
				}
			});
			if (foundWinningPattern) {
				alert("Winner", board[currentPattern[0]])
				setResult({ ...result, winner: board[currentPattern[0]], state: "Won" });
			}
		});
	};
	const checkIfTie=()=>{
		let filled =true
		board.forEach(square=>{
			if(square === ''){
				filled=false
			}
		})
		if(filled){
			alert('Game is tied')
			setResult({winner: "None", state: 'Tie'})
		}
	}
	useEffect(() => {
		checkWinner();
		checkIfTie()
	}, [board]);
	return (
		<div className="gap-2 flex flex-col w-[400px] h-[400px]   ">
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
