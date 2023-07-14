import React from "react";
import Modal from "./components/ui/Modal";

const EndModal = (props) => {

    const restartHandler = (event) => {
        props.onRestart();
    }

    return(
        <Modal>
            <h2>Game Over</h2>
            <p>{props.total / 10} out of {props.quizLength} answers correct</p>
            <p>Score: {props.total}</p>
            <button type="button" onClick={restartHandler}>Restart</button>
        </Modal>
    )
}

export default EndModal;