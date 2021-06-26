import React from 'react';

import '../styles/Button.css';

const Button = (props) =>{
    return (
        <button className = "btn primary" onClick= {props.onClick}> 
            {props.title}
        </button>
    );
}

export default Button;