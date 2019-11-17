import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
    EDITOR_LINE_CHANGE,
    EDITOR_PREVIEW,
    LINE_CHANGE,
} from '../constants'

import {
    makeLine,
} from '../utils/lines'

import {
    store
} from '../index'


export function addLine() {
    const lineObj = makeLine()
    return {
        type: EDITOR_ADD_LINE,
        payload: {
            lineObj,
        }
    }
}

export function removeLine(id) {
    return {
        type: EDITOR_REMOVE_LINE,
        payload: {
            id
        }
    }
}

export function changeActiveLine(id) {
    return {
        type: EDITOR_LINE_CHANGE,
        payload: {
            id,
        },
    }
}

export function preview(on) {
    const {
        lines
    } = store.getState()
    return {
        type: EDITOR_PREVIEW,
        payload: {
            on,
            lines,
        }
    }
}

export function lineChange(id, value) {
    return {
        type: LINE_CHANGE,
        payload: {
            id,
            value,
        }
    }
}
