class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    onChangeValue = (e) => {
        let value = e.target.value;
        this.setState({
            value
        });
    }

    onPlusClick = () => {
        this.setState({
            value: this.state.value + 1
        });
    }

    onMinusClick = () => {
        this.setState({
            value: this.state.value > 0 ? (this.state.value - 1) : 0
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                null,
                `The Famous Truexin's Counter`
            ),
            React.createElement(
                'img',
                {
                    src: './assets/black_flag.svg',
                    width: '100',
                    height: '100',
                    style: {
                        margin: '10px 30px'
                    }
                }
            ),
            React.createElement(
                'div',
                {
                    style: {
                        color: '#f00',
                        width: '100px',
                        'text-align': 'center',
                        'font-size': '18px',
                        margin: '10px'
                    }
                },
                `${ this.state.value }`
            ),
            React.createElement(
                'input',
                {
                    style: {
                        display: 'block',
                        width: '100px',
                        padding: '10px',
                        outline: 'none'
                    },
                    value: this.state.value,
                    onChange: this.onChangeValue
                },
            ),
            React.createElement(
                'button',
                {
                    onClick: this.onPlusClick,
                    style: {
                        'font-size': '18px',
                        'margin-left': '10px',
                        'margin-top': '10px'
                    }
                },
                '+'
            ),
            React.createElement(
                'button',
                {
                    onClick: this.onMinusClick,
                    style: {
                        'font-size': '18px',
                        'margin-left': '60px',
                        'margin-top': '10px'
                    }
                },
                '-',
            )
        );
    }
}

let myCounter = React.createElement(Counter, null, null);
ReactDOM.render(myCounter, document.getElementById('root'));
