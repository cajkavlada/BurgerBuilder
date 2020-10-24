import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    Salad: 0.5,
    Bacon: 0.7,
    Cheese: 0.4,
    Meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        showSummary: false,
        loading: false,
        error: false
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

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error: true});
                console.log(error)
            });
    }

    checkoutHandler = () => {
        //alert("Checkout");
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Vladimir Cajka',
                adress: {
                    street: 'Dukelska',
                    ZipCode: '324',
                    City: 'Usti nad Orlici',
                    Country: 'Czechia',
                },
                email: 'cajka.vlada@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, showSummary: false });
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false, showSummary: false });
            });
    }

    render() {

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls price={this.state.totalPrice} ingredients={this.state.ingredients} order={this.showOrderSummaryHandler}
                        addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} checkout={this.checkoutHandler} hide={this.hideOrderSummaryHandler} price={this.state.totalPrice} />;
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
        }
        return (
            <Aux>
                <Modal show={this.state.showSummary} hide={this.hideOrderSummaryHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);