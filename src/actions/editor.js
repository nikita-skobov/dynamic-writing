import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
    EDITOR_LINE_CHANGE,
} from '../constants'


export function addLine() {
    return {
        type: EDITOR_ADD_LINE,
    }
}

export function removeLine() {
    return {
        type: EDITOR_REMOVE_LINE,
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
