import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


import TeacherPage from './TeacherPage';
import MainPage from './MainPage';

//temp
import EventList from './EventList';

class App extends React.Component {
    render(){
        return (
            <Router>
           
                <Switch>
                    <Route path = '/' exact component = {MainPage} />
                </Switch>
                <Switch>
                    <Route path = '/teacher-page' exact component = {TeacherPage} />
                </Switch>
                <Switch>
                    <Route path = '/event-list' exact component ={EventList} />
                </Switch>
                
                

            </Router>
        );
    }
}
  
  export default App;
  