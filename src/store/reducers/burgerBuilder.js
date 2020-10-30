import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    prices: {
        Salad: 0.5,
        Bacon: 0.7,
        Cheese: 0.4,
        Meat: 1.3
    },
    totalPrice: 4,
    error: false
};

const addIngredient = (state, action) => {
    const newIngredients = {
        ...state.ingredients,
        [action.name]: state.ingredients[action.name] + 1
    };
    return {
        ...state,
        ingredients: newIngredients,
        totalPrice: state.totalPrice + state.prices[action.name]
    };
}

const removeIngredient = (state, action) => {
    const newIngredients = {
        ...state.ingredients,
        [action.name]: state.ingredients[action.name] - 1
    };
    return {
        ...state,
        ingredients: newIngredients,
        totalPrice: state.totalPrice - state.prices[action.name]
    };
}

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            Salad: action.ingredients.Salad,
            Bacon: action.ingredients.Salad,
            Cheese: action.ingredients.Cheese,
            Meat: action.ingredients.Meat
        },
        totalPrice: 4,
        error: false
    };
}

const fetchIngredientFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
        default: return state;
    }
}

export default reducer;