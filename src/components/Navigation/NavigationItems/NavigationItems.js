import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = (props) => (
    <nav className={styles.NavigationItems}>
        <ul>
            <NavigationItem pathname='/' exact>Burger Builder</NavigationItem>
            <NavigationItem pathname='/orders'>Orders</NavigationItem>
        </ul>
    </nav>
);

export default navigationItems;