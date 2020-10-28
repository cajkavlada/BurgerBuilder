import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const cancelHandler = (history) => {
    history.goBack();
}

const continueHandler = (history) => {
    history.replace('/checkout/contact-data');
}

const checkout = props => (
    <div>
        <CheckoutSummary cancel={cancelHandler.bind(this,props.history)} continue={continueHandler.bind(this,props.history)} ingredients={props.ingredients} />
        <Route path={props.match.url + '/contact-data'} component={ContactData} />
    </div>
);

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(checkout);