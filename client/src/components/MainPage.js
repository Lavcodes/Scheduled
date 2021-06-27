import React from 'react';
import { connect } from 'react-redux';

import Modal from '../elements/Modal';
import Button from '../elements/Button';
import Header from '../elements/Header';

import AddTeacher from './AddTeacher';
import TeacherCard from './TeacherCard';
import TeacherPage from './TeacherPage';


import '../styles/TeacherCard.css'

import { fetchTeachers, addTeacherAction, setTeacheridAction } from '../actions';

class MainPage extends React.Component{
    
    state = {
        show : false,
        selected : false
    };

    onCancel = () =>{
        this.setState({ show : false});
    };

    onAddTeacherSubmit = async (name, department, avatar) =>{
      
       await this.props.addTeacherAction(name, department, avatar);
    }

    componentDidMount = async () =>{
        await this.props.fetchTeachers();
         
    }
    

    teacher_selected = async (id) =>{
        console.log(id);
       
        await this.props.setTeacheridAction(id);
        this.setState({selected:true});


    }


   

    render(){
        const List = this.props.teachers_list.map((teacher)=>{
            console.log('inmain');
            console.log(teacher);
            return <TeacherCard id={teacher.teacher_id} 
                        name ={teacher.teacher_name} 
                        department = {teacher.department}
                        avatar={teacher.avatar}
                        onClick = {this.teacher_selected}
                        />
        });

        


        return(
            
                this.state.selected?<TeacherPage/>:(
                    <div>
            <Header/>
            <div>
            <Button onClick= {()=>{
            this.setState({show:true})
            }}
            title = 'Add Teacher'> 
            
            </Button>
            <Modal  title='Add Teacher' 
                    show={this.state.show} 
                    onCancel={this.onCancel} 
                    >
                <AddTeacher
                onSubmit = {this.onAddTeacherSubmit}/>
            </Modal>
            
        </div>
        <div className="list-container">
            {List}
        </div>

        </div>
                )
            

           

        );
    }
}

const mapStateToProps = (state) =>{
    return {
        teacher_id: state.teacher_id,
        teachers_list : state.teachers_list
    }
}

export default connect(mapStateToProps, {
    setTeacheridAction,
    fetchTeachers,
    addTeacherAction
})(MainPage);
  

