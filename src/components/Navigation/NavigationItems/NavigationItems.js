import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = (props) => (
    <nav className={styles.NavigationItems}>
        <ul>
            <NavigationItem pathname='/' exact>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem pathname='/orders'>Orders</NavigationItem> : null}
            {props.isAuth 
            ? <NavigationItem pathname='/logout'>Logout</NavigationItem>
            : <NavigationItem pathname='/auth'>Authenticate</NavigationItem>}
        </ul>
    </nav>
);

export default navigationItems;