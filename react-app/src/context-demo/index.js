import React, { Component } from 'react';
import { ThemeContext, themes } from "./theme-context.js";
import ThemedButton from './themed-button.js';

// isPureReactComponent
const Toolbar = ({ changeTheme }) => {
    return (
        <ThemedButton onClick={changeTheme}>
            Change Theme
        </ThemedButton>
    );
}

export default class ContextDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        };

        this.toggleTheme = () => {
            this.setState(
                state => ({
                    theme:
                        state.theme === themes.dark
                            ? themes.light
                            : themes.dark,
                })
            );
        };
    }

    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme={this.toggleTheme} />
                </ThemeContext.Provider>
                <div>
                    <ThemedButton />
                </div>
            </div>
        );
    }
}
