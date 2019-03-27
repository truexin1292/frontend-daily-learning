import React, { Component } from 'react';
import './App.css';
import MyRouter from './router';

class App extends Component {

    render() {
        return (
            <div className="App">
                <MyRouter/>
            </div>
        );
    }
}

export default App;
