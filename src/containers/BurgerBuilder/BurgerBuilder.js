import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    Salad: 0.5,
    Bacon: 0.7,
    Cheese: 0.4,
    Meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            Salad: 0,
            Bacon: 0,
            Cheese: 0,
            Meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler= (ingredient) => {
        const ingredients = {...this.state.ingredients};
        ingredients[ingredient] += 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[ingredient];
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
    }

    removeIngredientHandler = (ingredient) => {
        if (this.state.ingredients[ingredient] > 0) {
            const ingredients = {...this.state.ingredients};
            ingredients[ingredient] -= 1;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredient];
            this.setState({
                ingredients: ingredients,
                totalPrice: newPrice
            });
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls price={this.state.totalPrice} ingredients={this.state.ingredients} 
                    addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;