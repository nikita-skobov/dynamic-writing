import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
} from '../constants'


export function addLine() {
    return {
        type: EDITOR_ADD_LINE,
    }
}

export function removeLine(id) {
    return {
        type: EDITOR_REMOVE_LINE,
        payload: { id },
    }
}
