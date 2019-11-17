import React from 'react'
import { connect } from 'react-redux'

import Slider, { createSliderWithTooltip } from 'rc-slider'

import 'rc-slider/assets/index.css'

import {
    getIndexFromProperty,
} from '../utils'

const SliderWithTooltip = createSliderWithTooltip(Slider)

export class LineSettings extends React.Component {
    constructor(props) {
        super(props)

        this.defaultTransitionDuration = props.transitionDuration
        this.id = props.id
        this.actionChangeTransition = props.actionChangeTransition
        console.log('constructing line settings')
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        console.log('rednering line settings')
    
        return (
            <div>
                <div className="w-90 m-auto">
                    <label>Transition Duration (milliseconds)</label>
                    <SliderWithTooltip
                        min={0}
                        max={5000}
                        step={100}
                        onChange={(val) => { this.actionChangeTransition(this.id, val) }}
                        defaultValue={this.defaultTransitionDuration}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps

    const lineIndex = getIndexFromProperty(state.editor.lines, 'id', id)
    if (lineIndex === -1) {
        // this should never happen...
        return ownProps
    }

    return {
        ...ownProps,
        transitionDuration: state.editor.lines[lineIndex].transitionDuration,
    }
}

const mapActionsToProps = {
    actionChangeTransition: (id, transitionDuration) => {
        return {
            type: 'trans',
            payload: {
                id,
                transitionDuration,
            }
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(LineSettings)
