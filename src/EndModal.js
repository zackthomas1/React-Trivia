import React from "react";
import Modal from "./components/ui/Modal";
import Button from './components/ui/Button'

const EndModal = (props) => {

    const restartHandler = (event) => {
        props.onRestart();
    }

    return(
        <Modal>
            <h2>Game Over</h2>
            <p>{props.total / 10} out of {props.quizLength} answers correct</p>
            <p>Score: {props.total}</p>
            <Button type="button" onClick={restartHandler}>Restart</Button>
        </Modal>
    )
}

export default EndModal;