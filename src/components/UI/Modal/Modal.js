import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Modal = props => {

    /*shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }*/

    return (
        <Aux>
            <div className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
            <Backdrop show={props.show} hide={props.hide} />
        </Aux>
    );
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);