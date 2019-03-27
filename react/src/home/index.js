import React from 'react';
import logo from '../static/img/logo.svg';
import { format } from 'truexinutil';

export default class Home extends React.Component {

    render() {
        console.log('--log--:', format(Date.now()));
        return (
            <div>
                <header className="App-header">
                    <img src={ logo } className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        )
    }
}
