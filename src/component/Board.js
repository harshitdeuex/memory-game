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
        cardValue.sort(() => Math.random() - 0.5);
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
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [hintDisabled, setHintDisabled] = useState(false);
    const [totalStarsState, setTotalStarsState] = useState(totalStars);
    const [currentStarState, setCurrentStarState] = useState(stars[currentLevel/4]);

    console.log("Board");
    const setStar = (currentLevel) => {
        if(moves > 0 && moves <= Math.floor(0.75*currentLevel)){
            currentStar = 3;
        } else if(moves > 0 && moves > Math.floor(0.75*currentLevel) && moves <= currentLevel){
            currentStar = 2;
        } else if(moves > currentLevel) {
            currentStar = 1;
        } else {
            currentStar = 0;
        };
        stars[currentLevel/4] = currentStar;
        setCurrentStarState(stars[currentLevel/4]);
        setTotalStars(stars);
        setTotalStarsState(totalStars);
        /* displayChallengeButton(); */
    }


    const incrementMoves = () => {
        setMoves(moves + 1);
    }

    const resetMoves = () => {
        setMoves(0);
    }

    const resetMatchedPairs = () => {
        setMatchedPairs(0);
    }

    const incrementMatchedPairs = () => {
        setMatchedPairs(matchedPairs + 1);
    }

    const updateCardDeck = (card) => {
        setCardDeck(card);
        console.log("card deck updated")
    }

    const handleRestartLevel = (currentLevel) => {
        alert("restarting level");
        setMoves(0);
        createBoard();
        setCardDeck(card);
        stars[currentLevel/4] = 0;
        setCurrentStarState(stars[currentLevel/4]);
        setTotalStars(stars);
        setTotalStarsState(totalStars);
        setHintDisabled(false);
        setMatchedPairs(0);
        /* displayChallengeButton(); */
    }

    const handleRestartGame = () => {
        console.log("Restart Game Clicked");
        alert("restarting game");
        setMoves(0);
        createBoard();
        setCardDeck(card);
        currentStar = 0;
        setCurrentStarState(0);
        stars = copyOfStars;
        setTotalStars(copyOfStars);
        setTotalStarsState(0);
        console.log("after setting total stars")
        console.log();
        setHintDisabled(false);
        setMatchedPairs(0);
        console.log(stars);
        /* displayChallengeButton(); */
    }

    const handleLevelClicked = (level) => {
        setMoves(0);
        currentLevel = level;
        setCurrentStarState(stars[currentLevel/4]);
        createBoard();
        setCardDeck(card);
        setHintDisabled(false);
        setMatchedPairs(0);
        /* displayChallengeButton(); */
    }

    const handleHint = (currentLevel) => {
        let randomNumber = Math.ceil(Math.random()*currentLevel-1);
        if(!cardDeck[randomNumber].flipped){
            const newDeck = [...cardDeck];
            newDeck[randomNumber].flipped = true;
            updateCardDeck(newDeck);
            setTimeout(() => {
                 const newDeck = [...cardDeck]
;                newDeck[randomNumber].flipped = false;
                updateCardDeck(newDeck);
            }, 500); 

            setHintDisabled(true);
        }
        else {
            handleHint(currentLevel);
        }
    }

    const handleGiveUp = (currentLevel) => {
        const newDeck = [...cardDeck]
        for(let i=0; i<currentLevel; i++){
            newDeck[i].flipped = true;
        }
        updateCardDeck(newDeck);
        setHintDisabled(true);
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
                    hintDisabled={hintDisabled}
                    
                />
                
                <ScoreCard 
                    moves={moves}
                    currentLevelStars={currentStarState}
                    totalStars={totalStarsState}
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
                                matchedPairs={matchedPairs}
                                resetMatchedPairs={resetMatchedPairs}
                                incrementMatchedPairs={incrementMatchedPairs}
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