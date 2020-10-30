import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    cancelHandler = (history) => {
        history.goBack();
    }
    
    continueHandler = (history) => {
        history.replace('/checkout/contact-data');
    }
    
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary cancel={this.cancelHandler.bind(this, this.props.history)} continue={this.continueHandler.bind(this, this.props.history)} ingredients={this.props.ingredients} />
                    <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);