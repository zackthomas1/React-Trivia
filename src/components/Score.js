import React from "react";

import Card from "./ui/Card";

const Score = (props) => {
    return(
        <Card>
            <p>Question {props.quizCounter} out of {props.quizLength}</p>
            <p>Score: {props.total}</p>
        </Card>
    )
}

export default Score;