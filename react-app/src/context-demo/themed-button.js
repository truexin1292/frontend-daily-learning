import React from 'react';

import { ThemeContext } from './theme-context';

function ThemedButton(props) {
    return (
        <ThemeContext.Consumer>
            {
                theme => (
                    <button
                        {...props}
                        style={{ backgroundColor: theme.background, width: 200, height: 100 }}
                    />
                )
            }
        </ThemeContext.Consumer>
    );
}

export default ThemedButton;
