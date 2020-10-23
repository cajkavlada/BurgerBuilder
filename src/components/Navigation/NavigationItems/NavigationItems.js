import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = (props) => (
    <nav className={styles.NavigationItems}>
        <ul>
            <NavigationItem active>Burger Builder</NavigationItem>
            <NavigationItem>Checkout</NavigationItem>
        </ul>
    </nav>
);

export default navigationItems;