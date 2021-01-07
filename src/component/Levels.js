import React from 'react';

const Levels = (props) => {
    return (
        <div className="levels-container">
                <ul>
                    <li className="btn" onClick={() => props.handleLevelClicked(4)}>Level 1</li>
                    <li className="btn" onClick={() => props.handleLevelClicked(8)}>Level 2</li>
                    <li className="btn" onClick={() => props.handleLevelClicked(12)}>Level 3</li>
                    <li className="btn" onClick={() => props.handleLevelClicked(16)}>Level 4</li>
                    <li className="btn" onClick={() => props.handleLevelClicked(20)}>Level 5</li>
                </ul>
            </div>
    )
}

export default Levels;