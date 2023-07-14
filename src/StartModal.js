import React, { useState } from "react";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";

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
                <div>
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

                    <div>
                        {!isInputValid && isTouched && 
                            <p>Error - Input Invalid: Enter number between 0 and {props.maxQuizLength}</p>
                        }
                    </div>
                </div>

                <div>
                    <Button type="submit" disabled={disableSubmit}>Submit</Button>
                </div>
            </form>
        </Modal>
    )
}

export default StartModal;