import React from 'react';
const Buttons = (props) => {
    const currentLevel = props.currentLevel;
    return (
        <div className="all-buttons">
                    <div className="btn" onClick={() => props.handleRestartLevel(currentLevel)}>Restart Level</div>
                    <div className="btn" onClick={() => props.handleRestartGame()}>Restart Game</div>
                    <div className="btn" onClick={() => props.handleGiveUp(currentLevel)}>I Give Up</div>
                    <div className="btn" id="hint" disabled={props.hintDisabled} onClick={() => props.handleHint(currentLevel)}>Hint</div>
                {/* <div className="btn" id="challenge" style={{display: "none"}}>Challenge a friend</div> */}
                </div>
    )
}

export default Buttons;