import React from "react";
import Card from "./ui/Card";
import classes from './Score.module.css'

const Score = (props) => {
    return(
        <div className={classes.container}>
            <Card >
                <p>Question {props.quizCounter} out of {props.quizLength}</p>
                <p>Score: {props.total}</p>
            </Card>
        </div>

    )
}

export default Score;