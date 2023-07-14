import React, { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

import classes from './StartModal.module.css'

const StartModal = (props) => {
    // states
    const [ inputQuizLength, setInputQuizLength ] = useState('');
    const [ isInputValid, setIsInputValid ] = useState(false); 
    const [ isTouched, setIsTouched ] = useState(false);
    
    const disableSubmit = !isInputValid

    // Handlers
    const onBlurHandler = (event) => {
        setIsTouched(true);
    }

    const inputChangeHandler = (event) => {
        const input = event.target.value;
        setInputQuizLength(input);

        if( 0 < input && input <= props.maxQuizLength){
            setIsInputValid(true);
        }else{
            setIsInputValid(false)
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(1 > inputQuizLength || inputQuizLength > props.maxQuizLength){
            return;
        }
        
        props.setQuizLength(inputQuizLength);
        props.setDisplayStartModal(false)
    }

    return(
        <Modal
            onClose=""
        >
            <form onSubmit={onSubmitHandler}>
                <div className={classes.content}>
                    <div className={classes.inputs}>
                        <label htmlFor="quizLength">Number of Questions: </label>
                        <input
                            type="number"
                            id="quizLength"
                            name='quizLength'
                            value={inputQuizLength}
                            min='1'
                            max={props.maxQuizLength}
                            onChange={inputChangeHandler}
                            onBlur={onBlurHandler}
                        />
                    </div>

                    <div className={classes.error}>
                        {!isInputValid && isTouched && 
                            <p>Error - Input Invalid: Enter number between 0 and {props.maxQuizLength}</p>
                        }
                    </div>

                    <div className={classes.actions}>
                        <Button type="submit" disabled={disableSubmit}>Submit</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default StartModal;