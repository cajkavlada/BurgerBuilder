import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let p of query) {
            if (p[0] === 'price') {
                price = p[1];
            } else {
                ingredients[p[0]] = parseInt(p[1], 10);
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary cancel={this.cancelHandler} continue={this.continueHandler} ingredients={this.state.ingredients} />
                <Route path={this.props.match.url + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}/>
            </div>
        );
    };
}

export default Checkout;