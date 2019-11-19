import {
    generateId,
} from './index'

export function makeLine(isFocused = true) {
    const id = generateId()

    const transitionDuration = 150
    const transitionType = 'fade'
    const delayDuration = 1000

    return {
        id,
        transitionDuration,
        transitionType,
        delayDuration,
        isFocused,
        value: '...',
    }
}
