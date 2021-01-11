import React from 'react';

const Levels = (props) => {
    const {totalLevels, handleLevelClicked} = props;
    let totalLevelsArray = [];

    for(let i=1; i<= totalLevels; i++){
        totalLevelsArray.push(i);
    }
    return (
        <div className="levels-container">
                <ul>
                    {totalLevelsArray.map((level) => {
                        return <li 
                                key={level}
                                className="btn" 
                                onClick={() => handleLevelClicked(level*4)}>
                                Level {level}
                                </li>    
                    })}
                </ul>
            </div>
    )
}

export default Levels;