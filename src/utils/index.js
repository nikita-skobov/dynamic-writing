export function generateId(length = 8) {
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const charLength = chars.length
    let id = ''
    for (let i = 0; i < length; i += 1) {
        id = `${id}${chars[Math.floor(Math.random() * charLength)]}`
    }
    return id
}

export function getIndexFromProperty(list, prop, propValue) {
    let index = -1
    for (let i = 0; i < list.length; i += 1) {
        if (list[i][prop] === propValue) {
            index = i
            break
        }
    }

    return index
}