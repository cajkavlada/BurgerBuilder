import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clearError = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <WrappedComponent {...this.props} />
                    <Modal show={this.state.error} hide={this.clearError}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;