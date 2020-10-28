import * as actions from './actions';

const initialState = {
    ingredients: {
        Salad: 0,
        Bacon: 0,
        Cheese: 0,
        Meat: 0
    },
    prices: {
        Salad: 0.5,
        Bacon: 0.7,
        Cheese: 0.4,
        Meat: 1.3
    },
    totalPrice: 4
};

const reducer = (state = initialState, action) => {
    const newIngredients = { ...state.ingredients };
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            newIngredients[action.name] = state.ingredients[action.name] + 1;
            return {
                ...state,
                ingredients: newIngredients,
                totalPrice: state.totalPrice + state.prices[action.name]
            }
        case actions.REMOVE_INGREDIENT:
            newIngredients[action.name] = state.ingredients[action.name] - 1;
            return {
                ...state,
                ingredients: newIngredients,
                totalPrice: state.totalPrice - state.prices[action.name]
            }
        default:
            return state;
    }
}

export default reducer;