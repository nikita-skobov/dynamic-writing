import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'
import Transition from './Transition'

export class Preview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLine: 0,
            isTransitioning: props.lineList[0].transitionDuration > 0,
        }

        this.endTransition = this.endTransition.bind(this)
        this.changeLine = this.changeLine.bind(this)
    }

    componentDidMount() {
        const {
            isTransitioning
        } = this.state

        if (!isTransitioning) {
            this.endTransition()
        }
    }

    componentDidUpdate() {
        const {
            isTransitioning
        } = this.state

        if (!isTransitioning) {
            this.endTransition()
        }
    }

    endTransition() {
        const {
            lineList,
        } = this.props
        const {
            currentLine,
        } = this.state

        if (lineList[currentLine].delayDuration > 0) {
            setTimeout(() => {
                this.changeLine()
            }, lineList[currentLine].delayDuration)
        } else {
            if (currentLine + 1 < lineList.length) {
                this.changeLine()
            }
        }
    }

    changeLine() {
        this.setState((prevState) => {
            const {
                lineList
            } = this.props
            const {
                currentLine
            } = prevState
            const nextLine = currentLine + 1
            if (nextLine >= lineList.length) {
                // reached the end of the line list
                return prevState
            }

            return {
                currentLine: nextLine,
                isTransitioning: lineList[nextLine].transitionDuration > 0,
            }
        })
    }

    render() {
        const {
            lineList,
        } = this.props
        const {
            currentLine,
            isTransitioning,
        } = this.state

        return lineList.map((line, index) => {
            if (index <= currentLine) {
                if (index === currentLine && isTransitioning) {
                    return (
                        <Transition
                            key={line.id}
                            duration={line.transitionDuration}
                            doneCallback={this.endTransition}
                        >
                            <Line {...line} />
                        </Transition>
                    )
                }
                return <Line key={line.id} {...line} />
            }
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        lines,
    } = state.editor
    
    const lineList = [...lines]
    for (let i = 0; i < lineList.length; i += 1) {
        const lineId = lineList[i].id
        const value = state.lines[lineId]
        lineList[i].value = value
    }

    return {
        lineList
    }
}

export default connect(mapStateToProps)(Preview)
