import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        showSummary: false,
    }

    addIngredientHandler = (ingredient) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[ingredient] += 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[ingredient];
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
    }

    removeIngredientHandler = (ingredient) => {
        if (this.state.ingredients[ingredient] > 0) {
            const ingredients = { ...this.state.ingredients };
            ingredients[ingredient] -= 1;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredient];
            this.setState({
                ingredients: ingredients,
                totalPrice: newPrice
            });
        }
    }

    showOrderSummaryHandler = () => {
        this.setState({ showSummary: true });
    }

    hideOrderSummaryHandler = () => {
        this.setState({ showSummary: false });
    }

    checkoutHandler = () => {
        alert("Checkout");
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.showSummary} hide={this.hideOrderSummaryHandler}>
                    <OrderSummary ingredients={this.state.ingredients} checkout={this.checkoutHandler} hide={this.hideOrderSummaryHandler} price={this.state.totalPrice}/>
                </Modal>                
                <Burger ingredients={this.state.ingredients} />
                <BuildControls price={this.state.totalPrice} ingredients={this.state.ingredients} order={this.showOrderSummaryHandler}
                    addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;