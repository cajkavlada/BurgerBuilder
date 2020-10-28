import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        showSummary: false,
        loading: false,
        error: false
    }

    showOrderSummaryHandler = () => {
        this.setState({ showSummary: true });
    }

    hideOrderSummaryHandler = () => {
        this.setState({ showSummary: false });
    }

    componentDidMount() {
        /*axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error: true});
                console.log(error)
            });
            */
    }

    checkoutHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls price={this.props.totalPrice} ingredients={this.props.ingredients} order={this.showOrderSummaryHandler}
                        addIngredient={this.props.onAddIngredient} removeIngredient={this.props.onRemoveIngredient} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients} checkout={this.checkoutHandler} hide={this.hideOrderSummaryHandler} price={this.props.totalPrice} />;
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
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch({type: actions.ADD_INGREDIENT, name: name}),
        onRemoveIngredient: (name) => dispatch({type: actions.REMOVE_INGREDIENT, name: name})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));