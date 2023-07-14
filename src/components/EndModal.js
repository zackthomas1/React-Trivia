import React from "react";
import Modal from "./ui/Modal";
import Button from './ui/Button'

import classes from './EndModal.module.css'

const EndModal = (props) => {

    const restartHandler = (event) => {
        props.onRestart();
    }

    return(
        <Modal>
            <div className={classes.container}>
                <div className={classes.centered_text}>
                    <h2>Game Over</h2>
                    <p>{props.total / 10} out of {props.quizLength} answers correct</p>
                    <p>Score: {props.total}</p>
                </div>
                <div className={classes.center_bttn}>
                    <Button type="button" onClick={restartHandler}>Restart</Button>
                </div>
            </div>
        </Modal>
    )
}

export default EndModal;