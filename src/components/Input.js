import React from "react";

import classes from './Input.module.css'

const Input = (props) => {


    let revealAnswerDecoration = ''
    if(props.isAnswerSubmitted){
        if(parseInt(props.selection) === parseInt(props.index)){
            revealAnswerDecoration = classes.showIncorrectSelection
        }
        if(parseInt(props.answer) === parseInt(props.index)){
            revealAnswerDecoration = classes.showCorrectSelection
        }
    }

    return(
        <div className={revealAnswerDecoration}>
            <input
                type='radio' 
                id={`option${props.index}`}
                value={`${props.index}`} 
                onChange={props.onRadioChangeHandler} 
                name={props.id}
                disabled={props.isAnswerSubmitted}
                checked={parseInt(props.selection) === parseInt(props.index)}
            />
            <label htmlFor={`option${props.index}`}>{props.option}</label>
        </div>
    );
}

export default Input;