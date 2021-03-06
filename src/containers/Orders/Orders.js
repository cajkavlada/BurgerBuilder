import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders = props => {

    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    },[onFetchOrders, props.token, props.userId]);

    return (
        <div>
            {!props.loading ? props.orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />) : <Spinner />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));