import React from 'react';

import '../styles/FormElements.css'

const Input = (props) =>{
    return (
        <div className='custom-contain'>
        <label class="custom-field one">{props.placeholder}</label>    
        <label class="custom-field one">
            <input type="text" 
                   placeholder=" "
                   onChange = {props.onChange}
                   value = {props.value}
            />
            <span class="placeholder">{props.placeholder}</span>
        </label>
        </div>
    );
}

export default Input;