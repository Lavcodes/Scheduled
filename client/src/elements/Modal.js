import React from 'react';

import '../styles/Modal.css'

import Button from './Button';

const Modal = ( props ) =>{
    

    return(
        <div 
            className={`modal ${props.show ? 'show':''}`} 
            onClick={props.onCancel}>

            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>{props.title}</h4>
                </div>

                <div className="modal-body">
                   {props.children}
                </div>

                <div className="modal-footer">
                    <Button 
                        onClick = {props.onCancel}
                        title='Cancel'
                    />

                </div>
            </div>
        </div>
    )
}

export default Modal;