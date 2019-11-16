import { combineReducers } from 'redux'

const initialStates = {
    userProfile: {
        isMobile: false,
    },
    editor: {
        lines: ['dsa'],
    },
}

export function userProfile(
    state = initialStates.userProfile,
    action,
) {
    switch (action.type) {
        default:
            return state
    }
}

export function editor(
    state = initialStates.editor,
    action,
) {
    switch (action.type) {
        default:
            return state
    }
}

export default combineReducers({
    userProfile,
    editor,
})
