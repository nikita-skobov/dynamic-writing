import React from 'react'

export class Transition extends React.Component {
    constructor(props) {
        super(props)

        this.delay = 10
        this.isMount = true

        if (!this.props.transitionType) {
            this.transitionType = 'fade'
            // set default to fade
        } else {
            this.transitionType = this.props.transitionType
        }
        

        this.state = {
            duration: props.duration,
            alpha: 0,
            step: this.delay * (1 / props.duration),
            charIndex: 0,
        }

        this.adjustAlpha = this.adjustAlpha.bind(this)
        this.adjustChar = this.adjustChar.bind(this)
    }

    componentWillUnmount() {
        this.isMount = false
    }

    adjustChar() {
        const {
            charIndex,
        } = this.state

        let newCharIndex = charIndex
        const delay = Math.floor(
            this.props.duration / this.props.children.props.value.length
        )

        this.isMount && setTimeout(() => {
            this.isMount && this.setState((prevState) => {
                newCharIndex = prevState.charIndex + 1
                return {
                    ...prevState,
                    charIndex: newCharIndex,
                }
            }, () => {
                if (newCharIndex < this.props.children.props.value.length) {
                    this.isMount && this.adjustChar()
                } else {
                    this.props.doneCallback && this.isMount && this.props.doneCallback()
                }
            })
        }, delay)
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
            if (this.isMount) {
                switch (this.transitionType) {
                    case 'type': {
                        return this.adjustChar()
                    }
                    case 'fade':
                    default:
                        // fade is default
                        return this.adjustAlpha()
                }
            }
        }, this.delay)
    }

    render() {
        const {
            children,
        } = this.props
        const {
            alpha,
            charIndex,
        } = this.state

        
        if (this.transitionType === 'fade') {
            return (
                <div style={{ opacity: alpha }}>
                    {children}
                </div>
            )
        }

        const newStr = children.props.value.substr(0, charIndex)
        const newChild = React.cloneElement(
            children,
            {
                key: newStr,
                value: newStr,
            },
        )
        // clone the element so we can alter its value

        if (this.transitionType === 'type') {
            return (
                <div>
                    {newChild}
                </div>
            )
        }
    }
}

export default Transition
