let initialState = []

if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'))
    } else {
        initialState = []
    }
}

export const cartReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case 'ADD_TO_CART':
            return payload
        default:
            return state    
    }
}