import React, {useState} from 'react'
import Card from './Card'
import {gameStart, handleGiveUp, handleHint} from './Card';

/* let array = []; */
let cardValue = [];

/* let arrayObject = []; */
let card = [];

let currentLevel = 4;
let currentStar = 0;
let stars = {"1": 0, "2": 0,"3": 0,"4": 0,"5": 0}
let copyOfStars = {"1": 0, "2": 0,"3": 0,"4": 0,"5": 0};
/* let level1star = 0, level2star = 0,level3star = 0,level4star = 0,level5star = 0; */ 
let totalStars = 0;

/* createArray */
const createCardValues = () => {
    cardValue = [];
    for(let i=1; i<=currentLevel; i++){
        cardValue.push(Math.ceil(i/2));
    }
}

/* createArrayObject */
const createCard = () => {
    card = [];
    for(let i=1; i<=currentLevel; i++){
        card.push({id: i, flipped: false, value: cardValue[i-1]});
    }
    console.log(card);
}
const shuffle = (cardValue) => {
        return cardValue.sort(() => Math.random() - 0.5);
      }

const createBoard = () => {
    createCardValues();
    shuffle(cardValue);
    createCard();
}

const setTotalStars = (stars) => {
    totalStars = stars["1"] + stars["2"] + stars["3"] + stars["4"] + stars["5"];
}

/* const displayChallengeButton = () => {
    console.log("Display challenge button is called");
    if (stars.level1 && stars.level2 && stars.level3 && stars.level4 && stars.level5){
        document.getElementById("challenge").style.display = "block";
        alert("Challenge button is enabled, you can challenge a friend now.")
    } else {
        document.getElementById("challenge").style.display = "none";
    }
} */
createBoard();

const Board = () => {
    const [moves, setMoves] = useState(0);
    const [cardDeck, setCardDeck] = useState(card);
    const setStar = (currentLevel) => {
        if(moves <= Math.floor(0.75*currentLevel)){
            currentStar = 3;
        } else if(moves > Math.floor(0.75*currentLevel) && moves <= currentLevel){
            currentStar = 2;
        } else {
            currentStar = 1;
        };
        stars[currentLevel/4] = currentStar;
        setTotalStars(stars);
        /* displayChallengeButton(); */
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
        setCardDeck(card);
        createBoard();
        gameStart(currentLevel);
        stars[currentLevel/4] = 0;
        setTotalStars(stars);
        console.log(stars);
        /* displayChallengeButton(); */
    }

    const handleRestartGame = () => {
        alert("restarting game");
        currentStar = 0;
        stars = copyOfStars;
        setTotalStars(stars);
        setMoves(0);
        setCardDeck(card);
        createBoard();
        gameStart(currentLevel);
        /* displayChallengeButton(); */
    }

    const handleLevelClicked = (level) => {
        setMoves(0);
        setCardDeck(card);
        createBoard();
        gameStart(currentLevel);
        currentLevel = level;
        createBoard();
        setCardDeck(card);
        /* displayChallengeButton(); */
    }

    const handleOpenCard = (id) => {
        cardDeck.forEach((item) => {
            if(id === item.id){
                item.flipped = true;
            }
            console.log(item);
        })
    }

    const handleCloseCard = (id) => {
        for(let item in card){
            if(id === item.id){
                item.flipped = false;
            }
            console.log(item);
        }
    }

    return (
        <div className="wrapper">
            <h1>Memory Game</h1>
            <div><h3 className="level-indicator">Current Level: {currentLevel/4}</h3></div>
            <div><h4 className="hint-text">(You can only use hint once a level)</h4></div>
            <div className="all-buttons">
                <div className="btn" onClick={() => handleRestartLevel(currentLevel)}>Restart Level</div>
                <div className="btn" onClick={() => handleRestartGame()}>Restart Game</div>
                <div className="btn" onClick={() => handleGiveUp(currentLevel)}>I Give Up</div>
                <div className="btn" id="hint" onClick={() => handleHint(currentLevel)}>Hint</div>
                {/* <div className="btn" id="challenge" style={{display: "none"}}>Challenge a friend</div> */}
            </div>
            <div className="score-card">
                <p>Moves: {moves}</p>
                <p>Stars: {stars[currentLevel/4]}</p>
                <p>Total Stars: {totalStars}</p>
            </div>
            <div className="levels-container">
                <ul>
                    <li className="btn" onClick={() => handleLevelClicked(4)}>Level 1</li>
                    <li className="btn" onClick={() => handleLevelClicked(8)}>Level 2</li>
                    <li className="btn" onClick={() => handleLevelClicked(12)}>Level 3</li>
                    <li className="btn" onClick={() => handleLevelClicked(16)}>Level 4</li>
                    <li className="btn" onClick={() => handleLevelClicked(20)}>Level 5</li>
                </ul>
            </div>
            
            
            
            <div className="cards-container">
                {cardDeck.map((item) => {
                    return <Card 
                            key={item.id} 
                            value={item.value}
                            flipped={item.flipped} 
                            id={item.id} 
                            handleOpenCard={handleOpenCard}
                            handleCloseCard={handleCloseCard}
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