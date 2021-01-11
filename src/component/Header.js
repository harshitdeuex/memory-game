import React from 'react';
 
const Header = (props) => {
    return (
        <div className="header">
            <h1>Memory Game</h1>
            <div><h3 className="level-indicator">Current Level: {props.currentLevel}</h3></div>
            <div><h4 className="hint-text">(You can only use hint once a level)</h4></div>
        </div>
    )
}

export default Header;