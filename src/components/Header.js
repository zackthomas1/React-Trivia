import React from "react";

import classes from './Header.module.css'

const Header = (props) => {
    return(
        <div className={classes.header}>
            <h1>React Quiz App</h1>
            <h2>A simple quiz application</h2>
      </div>
    )
}

export default Header;