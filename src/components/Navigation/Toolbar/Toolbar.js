import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle toggleSideDrawer={props.toggleSideDrawer}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <div className={styles.DesktopOnly}> 
            <NavigationItems />
        </div>
    </header>
);

export default toolbar;