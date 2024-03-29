import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'
import Transition from './Transition'

export class Preview extends React.Component {
    constructor(props) {
        super(props)

        this.isMount = true

        this.state = {
            currentLine: 0,
            isTransitioning: props.lineList[0].transitionDuration > 0,
        }

        this.endTransition = this.endTransition.bind(this)
        this.changeLine = this.changeLine.bind(this)
    }

    componentWillUnmount() {
        this.isMount = false
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
                this.isMount && this.changeLine()
            }, lineList[currentLine].delayDuration)
        } else {
            if (currentLine + 1 < lineList.length) {
                this.isMount && this.changeLine()
            }
        }
    }

    changeLine() {
        this.isMount && this.setState((prevState) => {
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

        return [
            <h1 key="title">{this.props.title.value}</h1>,
            lineList.map((line, index) => {
                if (index <= currentLine) {
                    if (index === currentLine && isTransitioning) {
                        return (
                            <Transition
                                key={`transition-${line.id}`}
                                duration={line.transitionDuration}
                                doneCallback={this.endTransition}
                                transitionType={line.transitionType}
                            >
                                <Line {...line} />
                            </Transition>
                        )
                    }
                    return <Line key={line.id} {...line} />
                }
            })
        ]
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        stateField = 'editor',
        isPreview,
    } = ownProps

    const {
        lines,
        title,
    } = state[stateField]


    const lineList = [...lines]
    for (let i = 0; i < lineList.length; i += 1) {
        const lineId = lineList[i].id
        const value = state.lines[lineId]
        if (isPreview) {
            // in case not using the editor stateField
            // do not get the most recent value
            lineList[i].value = value
        }
    }

    return {
        lineList,
        title,
        isPreview,
    }
}

export default connect(mapStateToProps)(Preview)
