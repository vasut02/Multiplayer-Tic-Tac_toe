import React from 'react'
import Board from './Board'
import './Game.css'

const Game = () => {
    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        </div>
    )
}

export default Game
