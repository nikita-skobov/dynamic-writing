import {
    generateId,
} from './index'

export function makeLine(isFocused = true) {
    const id = generateId()

    const transitionDuration = 150
    const delayDuration = 1000

    return {
        id,
        transitionDuration,
        delayDuration,
        isFocused,
        value: '...',
    }
}
