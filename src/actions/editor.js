import {
    EDITOR_ENTER_PRESS,
} from '../constants'

export function enterPress(id) {
    return {
        type: EDITOR_ENTER_PRESS,
        payload: {
            id,
        }
    }
}
