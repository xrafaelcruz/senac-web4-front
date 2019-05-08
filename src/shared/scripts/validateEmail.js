function validateEmail(email) {
    const regex = /^(([^<>()[\].,;:'"´`^~\s@"]+(.[^<>()[\].,;:'"´`^~\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/

    if (email) {

        return regex.test(email) 

    }

    return false
}

export default validateEmail