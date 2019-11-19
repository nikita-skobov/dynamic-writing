import React from 'react'
import { connect } from 'react-redux'

import Slider, { createSliderWithTooltip } from 'rc-slider'

import 'rc-slider/assets/index.css'

import {
    getIndexFromProperty,
} from '../utils'
import { changeLineProp } from '../actions/editor'

const SliderWithTooltip = createSliderWithTooltip(Slider)

export class LineSettings extends React.Component {
    constructor(props) {
        super(props)

        this.defaultTransitionDuration = props.transitionDuration
        this.defaultDelayDuration = props.delayDuration
        this.id = props.id
        this.actionChangeTransition = props.actionChangeTransition
        this.actionChangeLineProp = props.actionChangeLineProp
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div>
                <div className="w-90 m-auto">
                    <label>Transition Duration (milliseconds)</label>
                    <SliderWithTooltip
                        min={0}
                        max={5000}
                        step={100}
                        onChange={(val) => { this.actionChangeLineProp(this.id, 'transitionDuration', val) }}
                        defaultValue={this.defaultTransitionDuration}
                    />
                    <label>Delay Duration (milliseconds)</label>
                    <SliderWithTooltip
                        min={0}
                        max={15000}
                        step={100}
                        onChange={(val) => { this.actionChangeLineProp(this.id, 'delayDuration', val) }}
                        defaultValue={this.defaultDelayDuration}
                    />
                    <label>Transition Type</label>
                    <select
                        defaultValue={this.props.transitionType}
                        onChange={({ target }) => { this.actionChangeLineProp(this.id, 'transitionType', target.value)}}>
                        <option value="fade">
                            Fade
                        </option>
                        <option value="type">
                            Type
                        </option>
                    </select>
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
        delayDuration: state.editor.lines[lineIndex].delayDuration,
        transitionType: state.editor.lines[lineIndex].transitionType,
    }
}

const mapActionsToProps = {
    actionChangeLineProp: changeLineProp,
}

export default connect(mapStateToProps, mapActionsToProps)(LineSettings)
