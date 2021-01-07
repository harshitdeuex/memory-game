import React, {useState} from 'react'
import Card from './Card'
import Buttons from './Buttons';
import ScoreCard from './ScoreCard';
import Header from './Header';
import Levels from './Levels';

let cardValue = [];

let card = [];

let currentLevel = 4;
let currentStar = 0;
let stars = {"1": 0, "2": 0,"3": 0,"4": 0,"5": 0}
let copyOfStars = {"1": 0, "2": 0,"3": 0,"4": 0,"5": 0};
let totalStars = 0;

const createCardValues = () => {
    cardValue = [];
    for(let i=1; i<=currentLevel; i++){
        cardValue.push(Math.ceil(i/2));
    }
}
const createCard = () => {
    card = [];
    for(let i=1; i<=currentLevel; i++){
        card.push({id:i, flipped: false, value: cardValue[i-1]});
    }
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
    return totalStars = stars["1"] + stars["2"] + stars["3"] + stars["4"] + stars["5"];
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
    console.log("Inside board cardDeck");
    console.log(cardDeck);
    console.log("Inside board card")
    console.log(card);
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

    const updateCardDeck = (card) => {
        setCardDeck(card);
        console.log("card deck updated")
        console.log(cardDeck);
    }

    const handleRestartLevel = (currentLevel) => {
        alert("restarting level");
        setMoves(0);
        createBoard();
        setCardDeck(card);
        stars[currentLevel/4] = 0;
        setTotalStars(stars);
        console.log(stars);
        /* displayChallengeButton(); */
    }

    const handleRestartGame = () => {
        alert("restarting game");
        currentStar = 0;
        stars = copyOfStars;
        setMoves(0);
        createBoard();
        setCardDeck(card);
        setTotalStars(copyOfStars);
        /* displayChallengeButton(); */
    }

    const handleLevelClicked = (level) => {
        setMoves(0);
        currentLevel = level;
        createBoard();
        setCardDeck(card);
        /* displayChallengeButton(); */
    }

    const handleHint = (currentLevel) => {
        let randomNumber = Math.ceil(Math.random()*currentLevel-1);
        console.log("random number: " + randomNumber);
        /* let color = document.getElementById(randomNumber).style.backgroundColor;
        console.log("color: " + color) */
        if(!cardDeck[randomNumber].flipped){
            /* document.getElementById(randomNumber).style.backgroundColor = "#ffffff";
            document.getElementById(randomNumber).style.color = "rgb(0, 0, 0)" */
            cardDeck[randomNumber].flipped = true;
            updateCardDeck(cardDeck);
            setTimeout(() => {
                /* document.getElementById(randomNumber).style.backgroundColor = cardBackgroundColor;
                document.getElementById(randomNumber).style.color = cardBackgroundColor; */
                cardDeck[randomNumber].flipped = false;
                updateCardDeck(cardDeck);
            }, 500);
            document.getElementById("hint").style.pointerEvents = "none";
        }
        else {
            handleHint(currentLevel);
        }
    }

    const handleGiveUp = (currentLevel) => {
        console.log("Inside give up button");
        for(let i=0; i<currentLevel; i++){
            /* document.getElementById(i).style.backgroundColor = "#ffffff";
            document.getElementById(i).style.color = "rgb(0, 0, 0)";
            document.getElementById(i).style.pointerEvents = "none"; */
            cardDeck[i].flipped = true;
        }
        updateCardDeck(cardDeck);
    }


    return (
        <div className="wrapper">
            <Header currentLevel={currentLevel/4}/>
            <Buttons
                currentLevel={currentLevel} 
                handleRestartLevel={handleRestartLevel}
                handleRestartGame={handleRestartGame}
                handleGiveUp={handleGiveUp}
                handleHint={handleHint}
            />
            <ScoreCard 
                moves={moves}
                currentLevelStars={stars[currentLevel/4]}
                totalStars={totalStars}
            />
            <Levels 
                handleLevelClicked={handleLevelClicked}
            />
                        
            <div className="cards-container">
                {cardDeck.map((item) => {
                    return <Card 
                            key={item.id} 
                            value={item.value}
                            flipped={item.flipped} 
                            id={item.id}
                            cardDeck={cardDeck}
                            updateCardDeck={updateCardDeck} 
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