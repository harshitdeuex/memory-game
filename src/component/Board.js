import React, {useState} from 'react'
import Card from './Card'

let array = [1,2,3,4,5,6];
const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
      }

shuffle(array);

let arrayObject = [
    {
        id: 1,
        display: "none",
        value: array[0]
    },
    {
        id: 2,
        display: "none",
        value: array[1]
    },
    {
        id: 3,
        display: "none",
        value: array[2]
    },
    {
        id: 4,
        display: "none",
        value: array[3]
    },
    {
        id: 5,
        display: "none",
        value: array[4]
    },
    {
        id: 6,
        display: "none",
        value: array[5]
    },
]

const Board = (props) => {
    const [currentStar, setCurrentStar] = useState(0);
    const [totalStar, setTotalStar] = useState(0);
    const [moves, setMoves] = useState(0);
    const [cardArray, setCardArray] = useState(arrayObject);

    const incrementCurrentStars = () => {
        if(moves <= 4){
            setCurrentStar(3);
        } else if(moves > 4 && moves <= 6){
            setCurrentStar(2);
        } else {
            setCurrentStar(1);
        };
        console.log(totalStar);
    }
    
    const incrementMoves = () => {
        setMoves(moves + 1);
    }

    const handleRestartLevel = () => {
        alert("restart");
        setCurrentStar(0);
        setMoves(0);
        setCardArray(arrayObject);
        window.location.reload();
    }

    return (
        <div className="wrapper">
            <h1>Memory Game</h1>
            <div className="cards-container">
                {cardArray.map((item) => {
                    console.log(item);
                    return <Card 
                            key={item.id} 
                            value={Math.ceil(item.value/2)} 
                            id={item.id} 
                            incrementCurrentStars={incrementCurrentStars}
                            incrementMoves={incrementMoves}
                            />
                })}
                </div>
                <p>Stars: {currentStar}</p>
                <p>Total Stars: {totalStar}</p>
                <p>Moves: {moves}</p>
                <button onClick={handleRestartLevel}>Restart Level</button>
        </div>
    )
}

export default Board;