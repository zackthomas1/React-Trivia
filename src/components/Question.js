import React, { useState } from 'react'
import Input from './Input';


const Question = (props) => {
    // States
    const [selectedValue, setSelectedValue] = useState(-1);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [isSelectionCorrect, setIsSelectionCorrect] = useState(false);

    // Handlers
    const onRadioChangeHandler = (event) => {
        setSelectedValue(event.target.value); 
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const isCorrect = parseInt(selectedValue) === parseInt(props.answer);
        props.onSubmitAnswer(isCorrect); 
        setIsSelectionCorrect(isCorrect)
        setIsAnswerSubmitted(true);

        console.log(`Answer Submitted: ${selectedValue}\nCorrect Answer: ${props.answer}\nIs Selected Answer Correct: ${isCorrect}`)
    }

    const nextQuestionHandler = (event) => {
        props.onNextQuestion();

        // reset states
        setSelectedValue(-1);
        setIsAnswerSubmitted(false);
    }

    // JSX Elements
    const inputElems = props.options.map((option, index) => {
        return (
            <Input
                key={index}
                id={props.id}
                index={index}
                option={option}
                answer={props.answer}
                selection={selectedValue}
                isAnswerSubmitted={isAnswerSubmitted}
                onRadioChangeHandler={onRadioChangeHandler}
            />
        )
    })

    let revealAnswerTextElem = ''; 
    if(isAnswerSubmitted){
        if(isSelectionCorrect){
            revealAnswerTextElem = <p>Correct!</p>
        }else{
            revealAnswerTextElem = <p>Incorrect</p>
        }
    }

    const submitBttnElem = <button type='submit' disabled={isAnswerSubmitted || selectedValue === -1}>Submit Answer</button>
    const nextQuestionBttnElem = <button type='button' onClick={nextQuestionHandler}>Next Question</button>

    return (
        <div className='question'>
            <div className='selection'>
                <form onSubmit={onSubmitHandler}>
                    <fieldset>
                        <legend>{props.question}</legend>
                        <div className='options'>
                            {inputElems}
                        </div>
                        
                        <div>
                            {revealAnswerTextElem}
                        </div>

                        <div className='actions'>
                            {submitBttnElem}
                            {!isAnswerSubmitted ? '' : nextQuestionBttnElem}
                        </div>
                     </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Question