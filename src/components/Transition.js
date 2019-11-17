import React from 'react'

export class Transition extends React.Component {
    constructor(props) {
        super(props)

        this.delay = 10

        this.state = {
            duration: props.duration,
            alpha: 0,
            step: this.delay * (1 / props.duration),
        }

        this.adjustAlpha = this.adjustAlpha.bind(this)
    }

    adjustAlpha() {
        const {
            step,
            alpha,
        } = this.state

        let newAlpha = alpha

        this.setState((prevState) => {
            newAlpha = prevState.alpha + step
            return {
                ...prevState,
                alpha: newAlpha,
            }
        }, () => {
            if (newAlpha < 1) {
                setTimeout(() => {
                    this.adjustAlpha()
                }, this.delay)
            } else {
                this.props.doneCallback && this.props.doneCallback()
            }
        })

    }

    componentDidMount() {
        setTimeout(() => {
            this.adjustAlpha()
        }, this.delay)
    }

    render() {
        const {
            children,
        } = this.props
        const {
            alpha
        } = this.state

        return (
            <div style={{ opacity: alpha }}>
                {children}
            </div>
        )
    }
}

export default Transition
