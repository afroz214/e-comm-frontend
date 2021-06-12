export const userReducer = (state = null, action) => {
    const { type, payload } = action
    switch(type) {
        case 'USER_LOGGED_IN':
            return payload
        case 'LOGOUT':
            return payload
        default:
            return state       
    }
}