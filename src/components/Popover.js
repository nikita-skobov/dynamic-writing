import React from 'react'


export class Popover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }

        this.toggleOpen = this.toggleOpen.bind(this)
    }

    toggleOpen() {
        this.setState((prevState) => {
            if (prevState.open) {
                // it is open, now we are closing it
                this.props.onClose()
            } else {
                // it is closed, we are opening it
                this.props.onOpen()
            }

            return {
                open: !prevState.open
            }
        })
    }

    render() {
        const {
            open,
        } = this.state

        const list = [
            <input
                disabled={this.props.disabled}
                key="a"
                className={this.props.buttonClass}
                type="button"
                value={this.props.buttonText}
                onClick={this.toggleOpen}
            />
        ]

        if (open) {
            list.push(
                <div
                    key="b"
                    onClick={this.toggleOpen}
                    style={{ top: 0, left: 0, width: '100vw', position: 'absolute', height: '100vh' }}
                />,
                <div key="c" className="popover-box">
                    {this.props.children}
                </div>
            )
        }

        return list
    }
}


export default Popover
