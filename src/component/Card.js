import React from 'react';

let selectedCard1 = 0;
let selectedCard2 = 0;
let value1 = 0;
let value2 = 0;
let matchedPairs = 0;
const cardBackgroundColor = "#448AFF";

export const gameStart = (currentLevel) => {
    selectedCard1 = 0;
    selectedCard2 = 0;
    value1 = 0;
    value2 = 0;
    matchedPairs = 0;
    for(let i=1; i<=currentLevel; i++){
        document.getElementById(i).style.backgroundColor = cardBackgroundColor;
        document.getElementById(i).style.color = cardBackgroundColor;
        document.getElementById(i).style.pointerEvents = "auto";
    }
    document.getElementById("hint").style.pointerEvents = "auto";
}

export const handleGiveUp = (currentLevel) => {
    for(let i=1; i<=currentLevel; i++){
        document.getElementById(i).style.backgroundColor = "#ffffff";
        document.getElementById(i).style.color = "rgb(0, 0, 0)";
        document.getElementById(i).style.pointerEvents = "none";
    }
    document.getElementById("hint").style.pointerEvents = "auto";
}

export const handleHint = (currentLevel) => {
    let randomNumber = Math.ceil(Math.random()*currentLevel);
    console.log("random number: " + randomNumber);
    let color = document.getElementById(randomNumber).style.backgroundColor;
    console.log("color: " + color)
    if( color === "rgb(68, 138, 255)"){
        document.getElementById(randomNumber).style.backgroundColor = "#ffffff";
        document.getElementById(randomNumber).style.color = "rgb(0, 0, 0)"
        setTimeout(() => {
            document.getElementById(randomNumber).style.backgroundColor = cardBackgroundColor;
            document.getElementById(randomNumber).style.color = cardBackgroundColor;
        }, 500);
        document.getElementById("hint").style.pointerEvents = "none";
    }
    else {
        handleHint(currentLevel);
    }
}

const Card = (props) => { 
    let currentLevel = props.currentLevel;
    const gameCompleted = () => {
        if(matchedPairs === currentLevel/2){
            props.setStar(currentLevel);
            alert("Congratulations you have cleared this level");
            gameStart(currentLevel);
            selectedCard1 = 0;
            selectedCard2 = 0;
            value1 = 0;
            value2 = 0;
            matchedPairs = 0;
            props.resetMoves();
        }
    }
    
    const compareCards = () => {
        if (selectedCard1 && selectedCard2 && (value1 === value2)){
            selectedCard1 = 0;
            value1 = 0;
            selectedCard2 = 0;
            value2 = 0;
            matchedPairs++;
            props.incrementMoves();
            gameCompleted();
        } 
        
        else if (selectedCard1 && selectedCard2) {
            setTimeout(() => {
                document.getElementById(selectedCard1).style.backgroundColor = cardBackgroundColor;
                document.getElementById(selectedCard2).style.backgroundColor = cardBackgroundColor;
                document.getElementById(selectedCard1).style.color = cardBackgroundColor;
                document.getElementById(selectedCard2).style.color = cardBackgroundColor;
                document.getElementById(selectedCard1).style.pointerEvents = "auto";
                document.getElementById(selectedCard2).style.pointerEvents = "auto";
                selectedCard1 = 0;
                value1 = 0;
                selectedCard2 = 0;
                value2 = 0;
                props.incrementMoves();
                }, 500);
        }
    }
        const handleCardClick = (id) => {
            document.getElementById(id).style.backgroundColor = "#ffffff";
            document.getElementById(id).style.color = "rgb(0, 0, 0)";
            document.getElementById(id).style.pointerEvents = "none";
            document.getElementById(id).style.transition = "background-color 0.25s ease-out";
            if(selectedCard1 === 0){
                selectedCard1 = props.id;
                value1 = props.value;
            } else {
                selectedCard2 = props.id
                value2 = props.value;
            }

            compareCards();
        }
    

        return (
            <div 
                className="card"
                 onClick={() => handleCardClick(props.id)}
                 id={props.id}
                 >
                <p className="card-number">
                    {props.value}
                </p>
            </div>
        )
    }


export default Card;