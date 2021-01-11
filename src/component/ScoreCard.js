import React from 'react';

const ScoreCard = (props) => {
    return (
        <div className="score-card">
                <p>Moves: {props.moves}</p>
                <p>Stars: {props.currentLevelStars}</p>
                <p>Total Stars: {props.totalStars}</p>
            </div>
    )
}

export default ScoreCard;