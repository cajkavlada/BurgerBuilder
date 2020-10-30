import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (<Aux>
            <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.toggleSideDrawerHandler} />
            <SideDrawer show={this.state.showSideDrawer} hide={this.closeSideDrawerHandler} isAuth={this.props.isAuthenticated} />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

const mapStateToState = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
    
}
export default connect(mapStateToState)(Layout);