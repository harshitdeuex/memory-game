import React, {useState, useEffect} from 'react'
import Card from './Card'
import {gameStart, handleGiveUp, handleHint} from './Card';

let array = [];
let arrayObject = [];
let currentLevel = 6;
let currentStar = 0;
let level1star = 0, level2star = 0,level3star = 0,level4star = 0,level5star = 0; 
let totalStars = 0;

const createArray = () => {
    array = [];
    for(let i=1; i<=currentLevel; i++){
        array.push(i);
    }
}

const createArrayObject = () => {
    arrayObject = [];
    for(let i=1; i<=currentLevel; i++){
        arrayObject.push({id: i, display: "none", value: array[i-1]});
    }
}
const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
      }

const createBoard = () => {
    createArray();
    shuffle(array);
    createArrayObject();
}

const displayCurrentLevelStar = (currentLevel) => {
    switch(currentLevel){
        case 6: return level1star;
                 
        case 8: return level2star;
                
        case 10: return level3star;
                
        case 12: return level4star;
                
        case 14: return level5star;
                
        default: alert("Some error in setting stars");
    }
}

const displayCurrentLevel = (currentLevel) => {
    switch(currentLevel){
        case 6: return 1;
                 
        case 8: return 2;
                
        case 10: return 3;
                
        case 12: return 4;
                
        case 14: return 5;
                
        default: alert("Some error in getting level");
    }
}
createBoard();

const Board = () => {
    const [moves, setMoves] = useState(0);
    const [cardArray, setCardArray] = useState(arrayObject);

    const setStar = (currentLevel) => {
        if(moves <= Math.floor(0.75*currentLevel)){
            currentStar = 3;
        } else if(moves > Math.floor(0.75*currentLevel) && moves <= currentLevel){
            currentStar = 2;
        } else {
            currentStar = 1;
        };
        switch(currentLevel){
            case 6: level1star = currentStar;
                    break; 
            case 8: level2star = currentStar;
                    break;
            case 10: level3star = currentStar;
                    break;
            case 12: level4star = currentStar;
                    break;
            case 14: level5star = currentStar;
                    break;
            default: alert("Some error in setting stars");
        }
        totalStars = level1star + level2star + level3star + level4star + level5star;
    }
    const incrementMoves = () => {
        setMoves(moves + 1);
    }

    const resetMoves = () => {
        setMoves(0);
    }

    const handleRestartLevel = (currentLevel) => {
        alert("restarting level");
        setMoves(0);
        setCardArray(arrayObject);
        createBoard();
        gameStart(currentLevel);
        switch(currentLevel){
            case 6: level1star = 0;
                    break; 
            case 8: level2star = 0;
                    break;
            case 10: level3star = 0;
                    break;
            case 12: level4star = 0;
                    break;
            case 14: level5star = 0;
                    break;
            default: alert("Some error in setting stars");
        }
    }

    const handleRestartGame = () => {
        alert("restarting game");
        currentStar = 0;
        totalStars = 0;
        level1star = 0;
        level2star = 0;
        level3star = 0;
        level4star = 0;
        level5star = 0; 
        setMoves(0);
        setCardArray(arrayObject);
        createBoard();
        gameStart(currentLevel);
    }

    const handleLevelClicked = (level) => {
        setMoves(0);
        setCardArray(arrayObject);
        createBoard();
        gameStart(currentLevel);
        currentLevel = level;
        createBoard();
        setCardArray(arrayObject);
    }

    return (
        <div className="wrapper">
            <h1>Memory Game</h1>
            <div><h3 style={{textAlign: "center"}}>Current Level: {displayCurrentLevel(currentLevel)}</h3></div>
            <div><h4 style={{textAlign: "center"}}>(You can only use hint once)</h4></div>
            <div className="levels-container">
                <ul>
                    <li onClick={() => handleLevelClicked(6)}>Level 1</li>
                    <li onClick={() => handleLevelClicked(8)}>Level 2</li>
                    <li onClick={() => handleLevelClicked(10)}>Level 3</li>
                    <li onClick={() => handleLevelClicked(12)}>Level 4</li>
                    <li onClick={() => handleLevelClicked(14)}>Level 5</li>
                </ul>
            </div>
            <div className="all-buttons">
                <button onClick={() => handleRestartLevel(currentLevel)}>Restart Level</button>
                <button onClick={() => handleRestartGame()}>Restart Game</button>
                <button onClick={() => handleGiveUp(currentLevel)}>I Give Up</button>
                <button id="hint" onClick={() => handleHint(currentLevel)}>Hint</button>
            </div>
            
            <div className="score-card">
                <p>Moves: {moves}</p>
                <p>Stars: {displayCurrentLevelStar(currentLevel)}</p>
                <p>Total Stars: {totalStars}</p>
            </div>
            
            <div className="cards-container">
                {cardArray.map((item) => {
                    return <Card 
                            key={item.id} 
                            value={Math.ceil(item.value/2)} 
                            id={item.id} 
                            incrementMoves={incrementMoves}
                            restartLevel={handleRestartLevel}
                            resetMoves={resetMoves}
                            currentLevel={currentLevel}
                            setStar={setStar}
                            />
                })}
                </div>
        </div>
    )
}

export default Board;