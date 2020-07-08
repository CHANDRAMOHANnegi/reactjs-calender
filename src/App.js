import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Calendar from './components/Calendar/Calendar'
class App extends React.Component {
 
    render() {

        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/" exact component={Calendar} />
                    <Route path="/:year/:month" component={Calendar} />
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
