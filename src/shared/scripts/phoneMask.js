export function phoneMaskEvent(event, newValue, oldValue) {
    newValue = newValue.replace(/\D/g, '')

    if (event.charCode === 8) {

    } else if (newValue.length <= 11) {

      newValue = mask(newValue, event)

      return newValue

    } else {

      return oldValue

    }
}

export function phoneMask(newValue) {
    newValue = newValue.replace(/\D/g, '')
  
    newValue = mask(newValue)
  
    return newValue
}
  
function mask(newValue) {
    if (newValue.length === 0) {

        newValue = ''

    } else if (newValue.length <= 2) {

        newValue = newValue.replace(/^(\d{0,2})/, '($1')

    } else if (newValue.length <= 3) {

        newValue = newValue.replace(/^(\d{0,2})(\d{0,1})/, '($1) $2')

    } else if (newValue.length <= 6) {

        newValue = newValue.replace(/^(\d{0,2})(\d{0,4})/, '($1) $2')

    } else if (newValue.length <= 10) {

        newValue = newValue.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3')

    } else {

        newValue = newValue.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3')

    }

    return newValue
}
