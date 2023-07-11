import React from "react";

const Score = (props) => {
    return(
        <div>
            <p>Question {props.quizCounter} out of {props.quizLength}</p>
            <p>Score: {props.total}</p>
        </div>
    )
}

export default Score;