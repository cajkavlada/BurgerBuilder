import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const orders = [];
                for( let key in response.data){
                    orders.push({
                        id: key,
                        ...response.data[key]
                    });
                }
                this.setState({ loading: false, orders: orders});
            })
            .catch(error => {
                this.setState({ loading: false});
            });
    }

    render() {
        return (
            <div>
                {!this.state.loading ? this.state.orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price}/>) : <Spinner/>}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);