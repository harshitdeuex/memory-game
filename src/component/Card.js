import React from 'react';

let selectedCard1 = 0;
let selectedCard2 = 0;
let value1 = 0;
let value2 = 0;
let matchedPairs = 0;

const Card = (props) => { 

    const gameCompleted = () => {
        if(matchedPairs === 3){
            matchedPairs = 0;
            props.incrementCurrentStars();
            alert("congratulations you win");
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
            document.getElementById(selectedCard1).style.display = "none";
            document.getElementById(selectedCard2).style.display = "none";
            selectedCard1 = 0;
            value1 = 0;
            selectedCard2 = 0;
            value2 = 0;
            props.incrementMoves();
        }
    }
        console.log("Card is called")
        const handleCardClick = (id) => {
            document.getElementById(id).style.display = "block";
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
            <div className="card" onClick={() => handleCardClick(props.id)}>
                <p className="card-number" id={props.id} style={{display: "none"}}>
                    {props.value}
                </p>
            </div>
        )
    }


export default Card;