
export const couponReducer = (state = { cartTotalPrice: null, discountPrice: null, offPrice: null, discount: null, bools: false }, action) => {
    const { type, payload } = action
    switch(type) {
        case 'COUPON_APPLIED':
            return {
                ...state,
                cartTotalPrice: payload.cartTotalPrice,
                discountPrice: payload.discountPrice,
                offPrice: payload.offPrice,
                discount: payload.discount,
                bools: payload.bools
            }
        default:
            return state    
    }
}