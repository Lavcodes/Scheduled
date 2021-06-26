import React from 'react';

import Button from '../elements/Button';
import Input from '../elements/Input';

//hadle onclicj

class AddTeacher extends React.Component{

    state = {
        name : "",
        department : ""
    }
     
    onButtonClick = () =>{
        this.props.onSubmit(this.state.name, this.state.department);
    }

    render(){
       
        
        return (
            <div class="container">
                 
                <Input 
                    placeholder='Name'
                    value={this.state.name}
                    onChange={
                        (e)=>{
                            this.setState({name: e.target.value });
                        }
                    }
                />
                
                <Input 
                    placeholder='Department'
                    value={this.state.department}
                    onChange={
                        (e)=>{
                            this.setState({department: e.target.value });
                        }
                    }
                    
                />
                <Button title='Create Profile'
                    onClick={this.onButtonClick}
                ></Button>
            </div>

           
            
        );

    }
}

export default AddTeacher;