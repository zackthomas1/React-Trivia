import React, { useState } from 'react'

const Question = (props) => {
    const [selectedValue, setSelectedValue] = useState(0);

    const onRadioChangeHandler = (event) => {
        console.log("Selection Changed: ", event.target.value)
        setSelectedValue(event.target.value); 
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const isSelectionCorrect = parseInt(selectedValue) === parseInt(props.answer);

        console.log("Answer Submitted: ", selectedValue)
        console.log("Is Selection Correct: ", isSelectionCorrect)
        
        props.onSubmitAnswer(isSelectionCorrect)
    }

    const inputElems = props.options.map((option, index) => {
        return (
            <React.Fragment key={index}>
                <input 
                    type='radio' 
                    id={`option${index}`}
                    value={`${index}`} 
                    onChange={onRadioChangeHandler} 
                    name={props.id}/>
                <label htmlFor={`option${index}`}>{option}</label>
            </React.Fragment>
        )
    })

    return (
        <div className='question'>
            <div className='selection'>
                <form onSubmit={onSubmitHandler}>
                    <fieldset>
                        <legend>{props.question}</legend>
                        <div className='options'>
                            {inputElems}
                        </div>
                        <div className='actions'>
                            <button type='submit'>Answer</button>
                        </div>
                     </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Question