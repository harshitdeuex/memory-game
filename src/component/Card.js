import React from 'react';

let selectedCard1 = 0;
let selectedCard2 = 0;
let value1 = 0;
let value2 = 0;

const Card = (props) => { 
    let { 
        value, 
        flipped, 
        id, 
        updateCardDeck, 
        incrementMoves, 
        matchedPairs, 
        resetMatchedPairs, 
        incrementMatchedPairs, 
        resetMoves, 
        currentLevel, 
        setStar
        } = props;

    let cardDeck = [...props.cardDeck];

    const gameStart = (currentLevel) => {
        selectedCard1 = 0;
        selectedCard2 = 0;
        value1 = 0;
        value2 = 0;
        resetMatchedPairs();
        for(let i=0; i<currentLevel; i++){
            cardDeck[i].flipped = false;
        }
        updateCardDeck(cardDeck);
    }

    const gameCompleted = () => {
        if(matchedPairs === currentLevel/2-1){
            alert("Congratulations you have cleared this level");
            updateCardDeck(cardDeck);
            setStar(currentLevel);
            gameStart(currentLevel);
            resetMoves();
            resetMatchedPairs();
        }
    }
    
    const compareCards = () => {
        if (selectedCard1 && selectedCard2 && (value1 === value2)){
            selectedCard1 = 0;
            value1 = 0;
            selectedCard2 = 0;
            value2 = 0;
            updateCardDeck(cardDeck);
            incrementMatchedPairs();
            incrementMoves();
            gameCompleted();
        } 
        
        else if (selectedCard1 && selectedCard2) {
            setTimeout(() => {
                cardDeck[selectedCard1-1].flipped = false;
                cardDeck[selectedCard2-1].flipped = false;
                updateCardDeck(cardDeck);
                selectedCard1 = 0;
                value1 = 0;
                selectedCard2 = 0;
                value2 = 0;
                incrementMoves();
                }, 500);
        }
    }
        const handleCardClick = (id) => {
            cardDeck[id-1].flipped = true;
            updateCardDeck(cardDeck);
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