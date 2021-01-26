import React, { useState } from 'react';
import Sqaure from './Sqaure'
import calculateWinner from "./calculateWinner";

const Board = () => {

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

	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i] ) {
			return;
		}
		squares[i] = xIsNext ? 'X' : 'O';
		setSquares(squares);
		setXIsNext(!xIsNext);
		console.log(squares);
		forceUpdate();
	}

	const renderSquare = (i) => {
		console.log('render');
		return <Sqaure
			val={squares[i]}
			onClick={() => handleClick(i)}
		/>;
	}

	return (
		<div id="Board">
			{console.log('render again')}
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
