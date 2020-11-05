import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const toggleSideDrawerHandler = () => {
        setShowSideDrawer((prevState) => !prevState);
    }

    return (<Aux>
        <Toolbar isAuth={props.isAuthenticated} toggleSideDrawer={toggleSideDrawerHandler} />
        <SideDrawer show={showSideDrawer} hide={toggleSideDrawerHandler} isAuth={props.isAuthenticated} />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
    );
}

const mapStateToState = state => {
    return {
        isAuthenticated: state.auth.token != null
    }

}
export default connect(mapStateToState)(Layout);