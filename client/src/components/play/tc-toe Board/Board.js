import React, { useState, useContext, useEffect } from 'react';
import Sqaure from './Sqaure'
import io from 'socket.io-client'
import calculateWinner from "./calculateWinner";
import { UserContext } from "../../../UserContext"
import serverURL from "../../../constant";

// let socket;
const Board = ({ socket, room_id }) => {

	const ENDPT = `http://${serverURL}/`

	const { user, setUser } = useContext(UserContext);
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const [xIsNext, setXIsNext] = useState(true)

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	useEffect(() => {
		socket.on('squareClickedReceived', click => {
			console.log('emitted congratz', click.i);
			const i = click.i;
			console.log(xIsNext);
			squares[i] = xIsNext ? 'X' : 'O';
			setXIsNext(!xIsNext);
			console.log(xIsNext);
			setSquares(squares);
			console.log(squares);
			forceUpdate();
		})
	}, [xIsNext])

	const handleClick = (i) => {

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		console.log('emitting');
		const click = {
			i,
			name: user.name,
			user_id: user.id,
			room_id
		};
		socket.emit('squareClicked', click);

		// squares[i] = xIsNext ? 'X' : 'O';
		// setSquares(squares);
		// setXIsNext(!xIsNext);
		// // console.log(squares);
		// forceUpdate();
	}

	const renderSquare = (i) => {
		return <Sqaure
			val={squares[i]}
			onClick={() => handleClick(i)}
		/>;
	}

	return (
		<div id="Board">
			<div className="status">{status}</div>
			<div id="Board_game">
				<div className="board-row">
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className="board-row">
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className="board-row">
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
			</div>
		</div>
	)
}

export default Board
