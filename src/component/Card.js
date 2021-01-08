import React from 'react';

let selectedCard1 = 0;
let selectedCard2 = 0;
let value1 = 0;
let value2 = 0;

const Card = (props) => { 
    let currentLevel = props.currentLevel;
    let cardDeck = [...props.cardDeck]
    let flipped = props.flipped;
    let id = props.id;
    let value = props.value;
    let matchedPairs = props.matchedPairs;

    const gameStart = (currentLevel) => {
        selectedCard1 = 0;
        selectedCard2 = 0;
        value1 = 0;
        value2 = 0;
        props.resetMatchedPairs();
        for(let i=0; i<currentLevel; i++){
            cardDeck[i].flipped = false;
        }
        props.updateCardDeck(cardDeck);
        console.log("Game Start");
        console.log(cardDeck);
    }

    const gameCompleted = () => {
        if(matchedPairs === currentLevel/2-1){
            props.setStar(currentLevel);
            alert("Congratulations you have cleared this level");
            gameStart(currentLevel);
            props.resetMoves();
            props.resetMatchedPairs();
            props.updateCardDeck(cardDeck);
        }
    }
    
    const compareCards = () => {
        if (selectedCard1 && selectedCard2 && (value1 === value2)){
            selectedCard1 = 0;
            value1 = 0;
            selectedCard2 = 0;
            value2 = 0;
            props.incrementMatchedPairs();
            props.incrementMoves();
            props.updateCardDeck(cardDeck);
            gameCompleted();
        } 
        
        else if (selectedCard1 && selectedCard2) {
            setTimeout(() => {
                cardDeck[selectedCard1-1].flipped = false;
                cardDeck[selectedCard2-1].flipped = false;
                props.updateCardDeck(cardDeck);
                selectedCard1 = 0;
                value1 = 0;
                selectedCard2 = 0;
                value2 = 0;
                props.incrementMoves();
                }, 500);
        }
    }
        const handleCardClick = (id) => {
            cardDeck[id-1].flipped = true;
            props.updateCardDeck(cardDeck);
            if(selectedCard1 === 0){
                selectedCard1 = id;
                value1 = value;
            } else {
                selectedCard2 = id
                value2 = value;
            }

            compareCards();
        }

        
        return (
            <div 
                className={flipped ? "flipped" : "card"}
                 onClick={() => handleCardClick(id)}
                 id={id}
                 >
                <p className="card-number">
                    {value}
                </p>
            </div>
        )
    }


export default Card;