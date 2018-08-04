import React from 'react'
import './Timer.css'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.startTime = Date.now()
        this.state = {
            time: '00:00',
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                const timeMS = Date.now() - this.startTime
                this.setState({time: new Date(timeMS).toISOString().substr(14, 5)})
                this.props.onTimeChange(Math.round(timeMS / 1000))
            }, 1000)
    }

    componentDidUpdate () {
        if (this.props.stopped) clearInterval(this.timerID)
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