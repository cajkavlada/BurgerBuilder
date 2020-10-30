import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    const attachedClasses = props.show ? [styles.SideDrawer, styles.Open] : [styles.SideDrawer, styles.Close];
    return (
        <Aux>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuth={props.isAuth}/>
            </div>
            <Backdrop show={props.show} hide={props.hide}/>
        </Aux>
    );
};

export default sideDrawer;