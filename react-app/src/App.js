import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { ThemeContext, themes } from "./context-demo/theme-context.jsx";
import ThemedButton from './context-demo/themed-button.jsx';
import BasicExample from './router';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>
            Change Theme
        </ThemedButton>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        };

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
    }

    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                {/*<p className="App-intro">*/}
                {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
                <BasicExample />
                <div>
                    <ThemeContext.Provider value={this.state.theme}>
                        <Toolbar changeTheme={this.toggleTheme} />
                    </ThemeContext.Provider>
                    <div>
                        <ThemedButton />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
