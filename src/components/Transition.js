import React from 'react'

export class Transition extends React.Component {
    constructor(props) {
        super(props)

        this.delay = 10
        this.isMount = true

        this.state = {
            duration: props.duration,
            alpha: 0,
            step: this.delay * (1 / props.duration),
        }

        this.adjustAlpha = this.adjustAlpha.bind(this)
    }

    componentWillUnmount() {
        this.isMount = false
    }

    adjustAlpha() {
        const {
            step,
            alpha,
        } = this.state

        let newAlpha = alpha

        this.isMount && this.setState((prevState) => {
            newAlpha = prevState.alpha + step
            return {
                ...prevState,
                alpha: newAlpha,
            }
        }, () => {
            if (newAlpha < 1) {
                setTimeout(() => {
                    this.isMount && this.adjustAlpha()
                }, this.delay)
            } else {
                this.props.doneCallback && this.isMount && this.props.doneCallback()
            }
        })

    }

    componentDidMount() {
        setTimeout(() => {
            this.isMount && this.adjustAlpha()
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
