import React from 'react'
import './Hero.css'

class Hero extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    componentDidUpdate (prevProps) {
        let hpChange = this.props.hp - prevProps.hp
        if (hpChange) {
            this.setState({hpChange: hpChange > 0 ? '+' + hpChange : hpChange})
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(
                () => this.setState({hpChange: ''}),
                2000
            )
        }
    }

    render () {
        return (
            <div>
                <div className="visible-change-hp" style={{animationName: this.state.hpChange ? 'showDamage' : ''}}>
                    {this.state.hpChange}
                </div>
                {this.props.children}
            </div>
        )
    }
}

export { Hero }
