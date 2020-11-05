import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {
    const cancelHandler = (history) => {
        history.goBack();
    }

    const continueHandler = (history) => {
        history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    if (props.ingredients) {
        const purchasedRedirect = props.purchased && <Redirect to="/" />;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary cancel={() => cancelHandler(props.history)} continue={() => continueHandler(props.history)} ingredients={props.ingredients} />
                <Route path={props.match.url + '/contact-data'} component={ContactData} />
            </div>
        );
    }
    return summary;
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);