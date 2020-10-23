import React from 'react';
import styles from './DrawerToggle.module.css';

const name = (props) => (
    <div className={styles.DrawerToggle} onClick={props.toggleSideDrawer}>
        <div/><div/><div/>
    </div>
);

export default name;