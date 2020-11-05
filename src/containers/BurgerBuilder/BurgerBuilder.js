import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

    const [summaryIsVisible, setSummaryIsVisible] = useState(false);


    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token != null);

    const dispatch = useDispatch();

    const onAddIngredient = (name) => dispatch(actions.addIngredient(name));
    const onRemoveIngredient = (name) => dispatch(actions.removeIngredient(name));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const showOrderSummaryHandler = () => {
        if (isAuthenticated) {
            setSummaryIsVisible(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const hideOrderSummaryHandler = () => {
        setSummaryIsVisible(false);
    }

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const checkoutHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls price={totalPrice} ingredients={ingredients} order={showOrderSummaryHandler}
                    addIngredient={onAddIngredient} removeIngredient={onRemoveIngredient} isAuth={isAuthenticated} />
            </Aux>
        );
        orderSummary = <OrderSummary ingredients={ingredients} checkout={checkoutHandler} hide={hideOrderSummaryHandler} price={totalPrice} />;
    }
    return (
        <Aux>
            <Modal show={summaryIsVisible} hide={hideOrderSummaryHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);