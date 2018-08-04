import React from 'react'
import './Timer.css'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '00:00',
            startTime: Date.now()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                this.setState({time: new Date(Date.now() - this.state.startTime).toISOString().substr(14, 5)})
            }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className='timer'>
                {this.state.time}
            </div>
        );
    }
}

export { Timer }