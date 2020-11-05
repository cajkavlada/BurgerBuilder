import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <WrappedComponent {...props} />
                <Modal show={error} hide={clearError}>
                    {error && error.message}
                </Modal>
            </Aux>
        );
    }
}

export default withErrorHandler;