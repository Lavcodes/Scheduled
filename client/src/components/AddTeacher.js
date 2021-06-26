import axios from 'axios';
import React from 'react';

import Button from '../elements/Button';
import Input from '../elements/Input';

//hadle onclicj

class AddTeacher extends React.Component{

    state = {
        first_name : "",
        last_name:"",
        department : "",
        avatar : ""
    }
     
    onButtonClick = async () =>{
        const name = `${this.state.first_name} ${this.state.last_name}`;
        const img_url = `https://ui-avatars.com/api/?name=${this.state.first_name}+${this.state.last_name}`;
        
        this.setState({avatar:img_url});
        this.props.onSubmit(name, this.state.department, this.state.avatar);
    }

    render(){
       
        
        return (
            <div class="container">
                 
                <Input 
                    placeholder='First Name'
                    value={this.state.first_name}
                    onChange={
                        (e)=>{
                            this.setState({first_name: e.target.value });
                        }
                    }
                />
                <Input 
                    placeholder='Last Name'
                    value={this.state.last_name}
                    onChange={
                        (e)=>{
                            this.setState({last_name: e.target.value });
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