import React, { useState, useContext, useEffect , useRef } from 'react';
import Sqaure from './Sqaure'
import calculateWinner from "./calculateWinner";
import { UserContext } from "../../../UserContext"
import './Game.css'

const Board = ({ socket, room_id }) => {

	const { user, setUser } = useContext(UserContext);
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const xIsNext = useRef(true);
	const Chance = useRef(1);
	const Player = useRef('');
	
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = (Player.current  === user.id )?'Winner Winner Chicken Dinner ' : 'Better Luck Next Time';
		// status = 'Better Luck Next Time:' +Player.current;
	} else {
		status = (Player.current  !== user.id )?'Your Chance':'Opponent Chance';
	}

	useEffect(() => {
		socket.on('squareClickedReceived', click => {
			const i = click.i;			
			squares[i] = xIsNext.current ? 'X' : 'O';
			xIsNext.current = !xIsNext.current;				
			setSquares(squares);

			Player.current = click.user_id;

			if ( Chance.current === 2 ) Chance.current = 1;
			if ( Chance.current === -1 ) Chance.current = 2;
			console.log(squares);
			forceUpdate();
		})		
	} , [squares, xIsNext ])


	useEffect(() => {
		socket.on('playAgainReceived', () => {
			squares.fill(null);
			setSquares(squares)
			console.log(squares);
			Chance.current = 1;
			Player.current = '';
			forceUpdate();
		})
	}, [squares])
	

	const handleClick = (i) => {

		if ( Chance.current === 2 || Chance.current === -1 || calculateWinner(squares) || squares[i]) {
			return;
		}

		// console.log('emitting');
		const click = {
			i,
			name: user.name,
			user_id: user.id,
			room_id
		};
		socket.emit('squareClicked', click);
		Chance.current = -1;
	}

	const PlayAgain = () => {
		socket.emit('playAgain', room_id);
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
			<button onClick={PlayAgain} className='input-button' >Play Again</button>
		</div>
	)
}

export default Board
